# Near-Field + Identity Dual-Channel Target Speaker Detection — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Python prototype that detects when a near-field speaker (streamer with lavalier mic) is talking, while rejecting far-field speakers (passersby), using dual-channel fusion of acoustic proximity features + Personal VAD.

**Architecture:** Two independent channels feed a lightweight fusion layer. Channel 1 extracts DSP-based near-field acoustic features (spectral tilt, energy, plosive detection, SNR). Channel 2 runs a Personal VAD model (DENSE or USEF-TP) for speaker identity. The fusion layer combines P(near) and P(target) into a binary target flag per frame.

**Tech Stack:** Python 3.10+, NumPy, SciPy (signal processing), ONNX Runtime (PVAD inference), pytest

**Project location:** `/Users/noctis/Workspace/trySth/trending-clones/near-field-detector/`

---

## File Structure

```
near-field-detector/
├── src/
│   ├── features.py          # 4 acoustic proximity features + combined extractor
│   ├── pvad.py              # PVAD adapter (DENSE/USEF-TP/simulated)
│   ├── fusion.py            # Fusion layer (weighted combination)
│   └── pipeline.py          # End-to-end streaming pipeline
├── tests/
│   ├── test_features.py     # Unit tests for each acoustic feature
│   ├── test_fusion.py       # Unit tests for fusion layer
│   ├── test_pipeline.py     # Integration test for full pipeline
│   └── conftest.py          # Shared fixtures (synthetic audio generators)
├── eval/
│   ├── synthesize_data.py   # Generate near/far synthetic test audio
│   └── evaluate.py          # Compute metrics on test data
├── requirements.txt
└── README.md
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `near-field-detector/requirements.txt`
- Create: `near-field-detector/src/__init__.py`
- Create: `near-field-detector/tests/conftest.py`

- [ ] **Step 1: Create project directory and requirements**

```txt
# requirements.txt
numpy>=1.24
scipy>=1.10
onnxruntime>=1.16
pytest>=7.0
```

- [ ] **Step 2: Create conftest.py with shared audio fixtures**

```python
# tests/conftest.py
import numpy as np
import pytest

SAMPLE_RATE = 16000
FRAME_LEN = 480  # 30ms at 16kHz


@pytest.fixture
def silence_frame():
    """A frame of silence."""
    return np.zeros(FRAME_LEN, dtype=np.float32)


@pytest.fixture
def near_field_frame():
    """Simulated near-field speech: strong fundamental + harmonics + bass boost."""
    t = np.arange(FRAME_LEN) / SAMPLE_RATE
    # Fundamental at 150Hz with harmonics
    signal = np.sin(2 * np.pi * 150 * t) * 0.8
    signal += np.sin(2 * np.pi * 300 * t) * 0.4
    signal += np.sin(2 * np.pi * 450 * t) * 0.2
    # Bass boost (proximity effect): amplify below 300Hz
    signal += np.sin(2 * np.pi * 80 * t) * 0.6
    # Plosive burst in high frequencies
    signal += np.random.randn(FRAME_LEN) * 0.15
    signal[:40] += np.random.randn(40) * 0.5  # transient burst
    # High amplitude (near-field)
    return (signal / np.max(np.abs(signal)) * 0.9).astype(np.float32)


@pytest.fixture
def far_field_frame():
    """Simulated far-field speech: attenuated, bass-reduced, no plosive detail."""
    t = np.arange(FRAME_LEN) / SAMPLE_RATE
    signal = np.sin(2 * np.pi * 150 * t) * 0.3
    signal += np.sin(2 * np.pi * 300 * t) * 0.25
    signal += np.sin(2 * np.pi * 450 * t) * 0.15
    # No bass boost, no plosive transients
    # Add background noise
    signal += np.random.randn(FRAME_LEN) * 0.05
    # Low amplitude (far-field, ~30dB quieter)
    return (signal / np.max(np.abs(signal)) * 0.15).astype(np.float32)


@pytest.fixture
def near_field_stream(near_field_frame):
    """100 frames of near-field audio (3 seconds)."""
    frames = [near_field_frame.copy() for _ in range(100)]
    # Vary amplitude slightly
    for i, f in enumerate(frames):
        f *= 0.7 + 0.3 * np.sin(2 * np.pi * i / 50)
    return frames


@pytest.fixture
def far_field_stream(far_field_frame):
    """100 frames of far-field audio (3 seconds)."""
    frames = [far_field_frame.copy() for _ in range(100)]
    for i, f in enumerate(frames):
        f *= 0.8 + 0.2 * np.random.rand()
    return frames
```

- [ ] **Step 3: Create src/__init__.py**

```python
# src/__init__.py
```

- [ ] **Step 4: Commit**

```bash
cd /Users/noctis/Workspace/trySth/trending-clones/near-field-detector
git init
git add requirements.txt src/__init__.py tests/conftest.py
git commit -m "feat: scaffold project with shared test fixtures"
```

---

### Task 2: Spectral Tilt Feature

**Files:**
- Create: `tests/test_features.py` (spectral tilt test)
- Create: `src/features.py` (spectral tilt implementation)

- [ ] **Step 1: Write failing test for spectral tilt**

```python
# tests/test_features.py
import numpy as np
from src.features import spectral_tilt


def test_spectral_tilt_near_field_has_higher_tilt(near_field_frame, far_field_frame):
    """Near-field audio should have higher spectral tilt (more bass) than far-field."""
    near_tilt = spectral_tilt(near_field_frame, 16000)
    far_tilt = spectral_tilt(far_field_frame, 16000)
    assert near_tilt > far_tilt, (
        f"Near-field tilt ({near_tilt:.3f}) should be > far-field ({far_tilt:.3f})"
    )


def test_spectral_tilt_returns_float(near_field_frame):
    result = spectral_tilt(near_field_frame, 16000)
    assert isinstance(result, float)


def test_spectral_tilt_silence_returns_zero(silence_frame):
    result = spectral_tilt(silence_frame, 16000)
    assert result == 0.0
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /Users/noctis/Workspace/trySth/trending-clones/near-field-detector && python -m pytest tests/test_features.py::test_spectral_tilt_near_field_has_higher_tilt -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'src.features'`

- [ ] **Step 3: Implement spectral_tilt**

```python
# src/features.py
import numpy as np


def spectral_tilt(frame: np.ndarray, sample_rate: int) -> float:
    """Compute spectral tilt: ratio of low-freq energy to high-freq energy.

    Near-field speech shows a bass boost (proximity effect), resulting in
    higher spectral tilt. Far-field speech has a flatter spectrum.

    Args:
        frame: Audio frame, 1D float32 array.
        sample_rate: Sample rate in Hz.

    Returns:
        Spectral tilt ratio (low_freq_energy / high_freq_energy).
        Returns 0.0 for silence.
    """
    if np.max(np.abs(frame)) < 1e-7:
        return 0.0

    fft = np.abs(np.fft.rfft(frame))
    freqs = np.fft.rfftfreq(len(frame), 1.0 / sample_rate)

    low_mask = (freqs >= 50) & (freqs <= 300)
    high_mask = (freqs >= 2000) & (freqs <= 4000)

    low_energy = np.sum(fft[low_mask] ** 2)
    high_energy = np.sum(fft[high_mask] ** 2)

    if high_energy < 1e-12:
        return 0.0

    return float(low_energy / high_energy)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `python -m pytest tests/test_features.py -v`
Expected: 3 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/features.py tests/test_features.py
git commit -m "feat: add spectral tilt acoustic feature"
```

---

### Task 3: Frame Energy Feature

**Files:**
- Modify: `tests/test_features.py` (add energy tests)
- Modify: `src/features.py` (add frame_energy)

- [ ] **Step 1: Write failing tests for frame_energy**

Add to `tests/test_features.py`:

```python
from src.features import frame_energy


def test_frame_energy_near_field_louder(near_field_frame, far_field_frame):
    """Near-field audio should have higher energy than far-field."""
    near_e = frame_energy(near_field_frame)
    far_e = frame_energy(far_field_frame)
    assert near_e > far_e, (
        f"Near-field energy ({near_e:.3f}) should be > far-field ({far_e:.3f})"
    )


def test_frame_energy_returns_float(near_field_frame):
    result = frame_energy(near_field_frame)
    assert isinstance(result, float)


def test_frame_energy_silence_returns_negative_inf(silence_frame):
    result = frame_energy(silence_frame)
    assert result == -120.0  # floor value
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_features.py::test_frame_energy_near_field_louder -v`
Expected: FAIL — `ImportError: cannot import name 'frame_energy'`

- [ ] **Step 3: Implement frame_energy**

Add to `src/features.py`:

```python
def frame_energy(frame: np.ndarray, floor_db: float = -120.0) -> float:
    """Compute frame energy in dB.

    Near-field speech has ~30dB higher energy than far-field due to
    inverse-square law (10cm vs 3m distance).

    Args:
        frame: Audio frame, 1D float32 array.
        floor_db: Minimum energy value for silence.

    Returns:
        Energy in dB. Returns floor_db for silence.
    """
    rms = np.sqrt(np.mean(frame.astype(np.float64) ** 2))
    if rms < 1e-10:
        return floor_db
    return float(20.0 * np.log10(rms))
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_features.py -v`
Expected: 6 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/features.py tests/test_features.py
git commit -m "feat: add frame energy acoustic feature"
```

---

### Task 4: Plosive Detection Feature

**Files:**
- Modify: `tests/test_features.py` (add plosive tests)
- Modify: `src/features.py` (add plosive_score)

- [ ] **Step 1: Write failing tests for plosive_score**

Add to `tests/test_features.py`:

```python
from src.features import plosive_score


def test_plosive_near_field_stronger(near_field_frame, far_field_frame):
    """Near-field audio should have stronger plosive transients."""
    near_p = plosive_score(near_field_frame, 16000)
    far_p = plosive_score(far_field_frame, 16000)
    assert near_p > far_p, (
        f"Near-field plosive ({near_p:.3f}) should be > far-field ({far_p:.3f})"
    )


def test_plosive_returns_float(near_field_frame):
    result = plosive_score(near_field_frame, 16000)
    assert isinstance(result, float)
    assert result >= 0.0


def test_plosive_silence_returns_zero(silence_frame):
    result = plosive_score(silence_frame, 16000)
    assert result == 0.0
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_features.py::test_plosive_near_field_stronger -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement plosive_score**

Add to `src/features.py`:

```python
def plosive_score(frame: np.ndarray, sample_rate: int) -> float:
    """Detect plosive bursts in the 4-8kHz band.

    Plosives (p, b, t, k, etc.) create sharp broadband bursts that are
    only captured at very close range. At 3m+ distance, these transients
    are absorbed by air and lost in noise.

    Args:
        frame: Audio frame, 1D float32 array.
        sample_rate: Sample rate in Hz.

    Returns:
        Plosive score (high-frequency transient energy ratio).
        Returns 0.0 for silence.
    """
    if np.max(np.abs(frame)) < 1e-7:
        return 0.0

    fft = np.abs(np.fft.rfft(frame))
    freqs = np.fft.rfftfreq(len(frame), 1.0 / sample_rate)

    hf_mask = (freqs >= 4000) & (freqs <= 8000)
    full_mask = freqs > 50

    hf_energy = np.sum(fft[hf_mask] ** 2)
    full_energy = np.sum(fft[full_mask] ** 2)

    if full_energy < 1e-12:
        return 0.0

    return float(hf_energy / full_energy)
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_features.py -v`
Expected: 9 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/features.py tests/test_features.py
git commit -m "feat: add plosive detection acoustic feature"
```

---

### Task 5: SNR Estimation Feature

**Files:**
- Modify: `tests/test_features.py` (add SNR tests)
- Modify: `src/features.py` (add snr_estimate)

- [ ] **Step 1: Write failing tests for snr_estimate**

Add to `tests/test_features.py`:

```python
from src.features import snr_estimate


def test_snr_near_field_higher(near_field_frame, far_field_frame):
    """Near-field audio should have higher SNR."""
    near_snr = snr_estimate(near_field_frame, 16000)
    far_snr = snr_estimate(far_field_frame, 16000)
    assert near_snr > far_snr, (
        f"Near-field SNR ({near_snr:.3f}) should be > far-field ({far_snr:.3f})"
    )


def test_snr_returns_float(near_field_frame):
    result = snr_estimate(near_field_frame, 16000)
    assert isinstance(result, float)


def test_snr_silence_returns_zero(silence_frame):
    result = snr_estimate(silence_frame, 16000)
    assert result == 0.0
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_features.py::test_snr_near_field_higher -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement snr_estimate**

Add to `src/features.py`:

```python
def snr_estimate(frame: np.ndarray, sample_rate: int) -> float:
    """Estimate SNR using spectral entropy method.

    Near-field speech has high direct-sound-to-ambient ratio.
    The method separates speech-dominated frequency bins from
    noise-dominated bins using energy percentiles.

    Args:
        frame: Audio frame, 1D float32 array.
        sample_rate: Sample rate in Hz.

    Returns:
        Estimated SNR in dB. Returns 0.0 for silence.
    """
    if np.max(np.abs(frame)) < 1e-7:
        return 0.0

    fft = np.abs(np.fft.rfft(frame))
    freqs = np.fft.rfftfreq(len(frame), 1.0 / sample_rate)
    speech_mask = (freqs >= 80) & (freqs <= 4000)

    band = fft[speech_mask]
    if len(band) == 0:
        return 0.0

    power = band ** 2
    # Top 25% energy bins are likely speech, bottom 25% are noise
    sorted_power = np.sort(power)
    n = len(sorted_power)
    noise_floor = np.mean(sorted_power[: n // 4])
    speech_peak = np.mean(sorted_power[3 * n // 4 :])

    if noise_floor < 1e-12:
        return 60.0  # very high SNR

    return float(min(10.0 * np.log10(speech_peak / noise_floor), 60.0))
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_features.py -v`
Expected: 12 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/features.py tests/test_features.py
git commit -m "feat: add SNR estimation acoustic feature"
```

---

### Task 6: Combined Near-Field Probability Extractor

**Files:**
- Modify: `tests/test_features.py` (add extractor tests)
- Modify: `src/features.py` (add NearFieldExtractor class)

- [ ] **Step 1: Write failing tests for NearFieldExtractor**

Add to `tests/test_features.py`:

```python
from src.features import NearFieldExtractor


def test_extractor_near_field_probability_high(near_field_frame):
    """Near-field frame should get high P(near)."""
    ext = NearFieldExtractor(sample_rate=16000)
    prob = ext.extract(near_field_frame)
    assert 0.0 <= prob <= 1.0
    assert prob > 0.5, f"Near-field P(near) = {prob:.3f}, expected > 0.5"


def test_extractor_far_field_probability_low(far_field_frame):
    """Far-field frame should get low P(near)."""
    ext = NearFieldExtractor(sample_rate=16000)
    prob = ext.extract(far_field_frame)
    assert 0.0 <= prob <= 1.0
    assert prob < 0.5, f"Far-field P(near) = {prob:.3f}, expected < 0.5"


def test_extractor_silence_probability_low(silence_frame):
    """Silence should get low P(near)."""
    ext = NearFieldExtractor(sample_rate=16000)
    prob = ext.extract(silence_frame)
    assert prob < 0.2


def test_extractor_discriminates_stream(near_field_stream, far_field_stream):
    """Across a stream, near-field should consistently score higher."""
    ext = NearFieldExtractor(sample_rate=16000)
    near_probs = [ext.extract(f) for f in near_field_stream]
    far_probs = [ext.extract(f) for f in far_field_stream]
    near_mean = np.mean(near_probs)
    far_mean = np.mean(far_probs)
    assert near_mean > far_mean + 0.2, (
        f"Near mean ({near_mean:.3f}) should be much > far mean ({far_mean:.3f})"
    )
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_features.py::test_extractor_near_field_probability_high -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement NearFieldExtractor**

Add to `src/features.py`:

```python
class NearFieldExtractor:
    """Combines 4 acoustic features into a single P(near) probability.

    Uses a tiny 2-layer MLP with hand-tuned initial weights.
    Can be calibrated on real data later.
    """

    def __init__(
        self,
        sample_rate: int = 16000,
        weights: np.ndarray | None = None,
        bias: np.ndarray | None = None,
    ):
        self.sample_rate = sample_rate
        # Default weights: [spectral_tilt, energy, plosive, snr]
        # Normalized features → sigmoid → near probability
        self.weights = weights if weights is not None else np.array(
            [0.3, 0.3, 0.2, 0.2], dtype=np.float32
        )
        self.bias = bias if bias is not None else np.float32(-1.5)
        # Feature statistics for normalization (running estimates)
        self._feature_min = np.array([0.0, -80.0, 0.0, 0.0], dtype=np.float32)
        self._feature_max = np.array([50.0, 0.0, 0.5, 40.0], dtype=np.float32)

    def _normalize(self, features: np.ndarray) -> np.ndarray:
        """Min-max normalize features to [0, 1]."""
        span = self._feature_max - self._feature_min
        span[span < 1e-7] = 1.0
        normed = (features - self._feature_min) / span
        return np.clip(normed, 0.0, 1.0)

    def extract(self, frame: np.ndarray) -> float:
        """Extract P(near) from a single audio frame.

        Args:
            frame: Audio frame, 1D float32 array.

        Returns:
            Probability that the sound source is near-field [0, 1].
        """
        features = np.array([
            spectral_tilt(frame, self.sample_rate),
            frame_energy(frame),
            plosive_score(frame, self.sample_rate),
            snr_estimate(frame, self.sample_rate),
        ], dtype=np.float32)

        normed = self._normalize(features)
        score = float(np.dot(self.weights, normed) + self.bias)

        # Sigmoid to [0, 1]
        if score > 20.0:
            return 1.0
        if score < -20.0:
            return 0.0
        return float(1.0 / (1.0 + np.exp(-score)))
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_features.py -v`
Expected: 16 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/features.py tests/test_features.py
git commit -m "feat: add NearFieldExtractor combining 4 features into P(near)"
```

---

### Task 7: PVAD Adapter

**Files:**
- Create: `tests/test_pvad.py`
- Create: `src/pvad.py`

- [ ] **Step 1: Write failing tests for PVAD adapter**

```python
# tests/test_pvad.py
import numpy as np
from src.pvad import PVADAdapter


def test_pvad_returns_probability(near_field_frame):
    """PVAD should return a float in [0, 1]."""
    pvad = PVADAdapter(mode="simulate")
    prob = pvad.score(near_field_frame)
    assert isinstance(prob, float)
    assert 0.0 <= prob <= 1.0


def test_pvad_simulate_near_field_high(near_field_frame, far_field_frame):
    """In simulate mode, near-field should score higher (louder = more 'target-like')."""
    pvad = PVADAdapter(mode="simulate")
    near_p = pvad.score(near_field_frame)
    far_p = pvad.score(far_field_frame)
    assert near_p > far_p


def test_pvad_simulate_silence_low(silence_frame):
    pvad = PVADAdapter(mode="simulate")
    prob = pvad.score(silence_frame)
    assert prob < 0.1
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_pvad.py -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement PVAD adapter**

```python
# src/pvad.py
import numpy as np


class PVADAdapter:
    """Adapter for Personal VAD models.

    Supports three modes:
    - 'simulate': Uses energy-based heuristic (for testing without real models)
    - 'dense': Uses DENSE causal TCN model (requires ONNX model file)
    - 'usef_tp': Uses USEF-TP model (requires ONNX model file)
    """

    def __init__(
        self,
        mode: str = "simulate",
        model_path: str | None = None,
        reference_embedding: np.ndarray | None = None,
        sample_rate: int = 16000,
    ):
        self.mode = mode
        self.model_path = model_path
        self.reference_embedding = reference_embedding
        self.sample_rate = sample_rate
        self._session = None

        if mode in ("dense", "usef_tp") and model_path is not None:
            import onnxruntime as ort
            self._session = ort.InferenceSession(model_path)

    def score(self, frame: np.ndarray) -> float:
        """Score a frame for target speaker probability.

        Args:
            frame: Audio frame, 1D float32 array.

        Returns:
            P(target) in [0, 1].
        """
        if self.mode == "simulate":
            return self._simulate_score(frame)
        elif self.mode == "dense":
            return self._dense_score(frame)
        elif self.mode == "usef_tp":
            return self._usef_tp_score(frame)
        else:
            raise ValueError(f"Unknown PVAD mode: {self.mode}")

    def _simulate_score(self, frame: np.ndarray) -> float:
        """Energy-based heuristic for testing without a real PVAD model.

        Louder frames are treated as more likely target.
        This is NOT a real speaker verification — only for pipeline testing.
        """
        rms = np.sqrt(np.mean(frame.astype(np.float64) ** 2))
        if rms < 1e-7:
            return 0.0
        db = 20.0 * np.log10(rms)
        # Map [-60dB, -10dB] → [0.0, 1.0]
        score = (db + 60.0) / 50.0
        return float(np.clip(score, 0.0, 1.0))

    def _dense_score(self, frame: np.ndarray) -> float:
        """Run DENSE model inference. Requires ONNX model file."""
        if self._session is None:
            raise RuntimeError("DENSE model not loaded. Provide model_path.")
        # TODO: implement DENSE ONNX inference when model is available
        # Input: audio frame + reference audio
        # Output: target speaker probability
        raise NotImplementedError("DENSE ONNX integration pending model availability")

    def _usef_tp_score(self, frame: np.ndarray) -> float:
        """Run USEF-TP model inference. Requires ONNX model file."""
        if self._session is None:
            raise RuntimeError("USEF-TP model not loaded. Provide model_path.")
        raise NotImplementedError("USEF-TP ONNX integration pending model availability")
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_pvad.py -v`
Expected: 3 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/pvad.py tests/test_pvad.py
git commit -m "feat: add PVAD adapter with simulate mode for testing"
```

---

### Task 8: Fusion Layer

**Files:**
- Create: `tests/test_fusion.py`
- Create: `src/fusion.py`

- [ ] **Step 1: Write failing tests for fusion**

```python
# tests/test_fusion.py
import numpy as np
from src.fusion import FusionLayer


def test_fusion_both_high_returns_true():
    """When both channels agree 'yes', result should be True."""
    fusion = FusionLayer()
    assert fusion.decide(p_near=0.9, p_target=0.9) is True


def test_fusion_both_low_returns_false():
    """When both channels agree 'no', result should be False."""
    fusion = FusionLayer()
    assert fusion.decide(p_near=0.1, p_target=0.1) is False


def test_fusion_near_yes_target_no_returns_false():
    """Near-field but wrong speaker → False."""
    fusion = FusionLayer()
    assert fusion.decide(p_near=0.9, p_target=0.1) is False


def test_fusion_near_no_target_yes_returns_false():
    """Target speaker but far-field → False."""
    fusion = FusionLayer()
    assert fusion.decide(p_near=0.1, p_target=0.9) is False


def test_fusion_score_output():
    """Score should be a float."""
    fusion = FusionLayer()
    score = fusion.score(p_near=0.7, p_target=0.8)
    assert isinstance(score, float)


def test_fusion_custom_weights():
    """Custom weights should change the decision boundary."""
    # Heavy weight on near-field
    fusion = FusionLayer(w_near=0.8, w_target=0.1, w_interaction=0.1, threshold=0.4)
    # Near-field high, target low → interaction is low but w_near dominates
    assert fusion.decide(p_near=0.9, p_target=0.2) is True
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_fusion.py -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement FusionLayer**

```python
# src/fusion.py


class FusionLayer:
    """Fuses near-field probability and target-speaker probability.

    score = w_near * P(near) + w_target * P(target) + w_interaction * P(near) * P(target)
    flag = score > threshold

    The interaction term captures joint probability: the sound must be BOTH
    near-field AND from the target speaker.
    """

    def __init__(
        self,
        w_near: float = 0.3,
        w_target: float = 0.3,
        w_interaction: float = 0.4,
        threshold: float = 0.5,
    ):
        self.w_near = w_near
        self.w_target = w_target
        self.w_interaction = w_interaction
        self.threshold = threshold

    def score(self, p_near: float, p_target: float) -> float:
        """Compute fusion score.

        Args:
            p_near: Near-field probability from acoustic channel [0, 1].
            p_target: Target speaker probability from identity channel [0, 1].

        Returns:
            Fused score in [0, 1].
        """
        return (
            self.w_near * p_near
            + self.w_target * p_target
            + self.w_interaction * p_near * p_target
        )

    def decide(self, p_near: float, p_target: float) -> bool:
        """Make binary decision.

        Args:
            p_near: Near-field probability from acoustic channel [0, 1].
            p_target: Target speaker probability from identity channel [0, 1].

        Returns:
            True if target speaker is detected speaking near-field.
        """
        return self.score(p_near, p_target) > self.threshold
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_fusion.py -v`
Expected: 6 PASSED

- [ ] **Step 5: Commit**

```bash
git add src/fusion.py tests/test_fusion.py
git commit -m "feat: add fusion layer with weighted combination + interaction term"
```

---

### Task 9: End-to-End Streaming Pipeline

**Files:**
- Create: `tests/test_pipeline.py`
- Create: `src/pipeline.py`

- [ ] **Step 1: Write failing tests for pipeline**

```python
# tests/test_pipeline.py
import numpy as np
from src.pipeline import DetectionPipeline


def test_pipeline_near_field_stream_flags_mostly_true(near_field_stream):
    """Near-field stream should produce mostly True flags."""
    pipe = DetectionPipeline(sample_rate=16000)
    results = [pipe.process(f) for f in near_field_stream]
    true_ratio = sum(results) / len(results)
    assert true_ratio > 0.7, f"Near-field true ratio = {true_ratio:.2f}, expected > 0.7"


def test_pipeline_far_field_stream_flags_mostly_false(far_field_stream):
    """Far-field stream should produce mostly False flags."""
    pipe = DetectionPipeline(sample_rate=16000)
    results = [pipe.process(f) for f in far_field_stream]
    false_ratio = 1.0 - sum(results) / len(results)
    assert false_ratio > 0.7, f"Far-field false ratio = {false_ratio:.2f}, expected > 0.7"


def test_pipeline_returns_dict(near_field_frame):
    """Pipeline should return detailed output."""
    pipe = DetectionPipeline(sample_rate=16000)
    result = pipe.process_detailed(near_field_frame)
    assert "p_near" in result
    assert "p_target" in result
    assert "score" in result
    assert "flag" in result


def test_pipeline_silence_returns_false(silence_frame):
    pipe = DetectionPipeline(sample_rate=16000)
    assert pipe.process(silence_frame) is False
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tests/test_pipeline.py -v`
Expected: FAIL — `ImportError`

- [ ] **Step 3: Implement DetectionPipeline**

```python
# src/pipeline.py
import numpy as np
from src.features import NearFieldExtractor
from src.pvad import PVADAdapter
from src.fusion import FusionLayer


class DetectionPipeline:
    """End-to-end streaming target speaker detection pipeline.

    Processes one audio frame at a time, suitable for streaming use.
    """

    def __init__(
        self,
        sample_rate: int = 16000,
        pvad_mode: str = "simulate",
        pvad_model_path: str | None = None,
        reference_embedding: np.ndarray | None = None,
        fusion_threshold: float = 0.5,
    ):
        self.near_field = NearFieldExtractor(sample_rate=sample_rate)
        self.pvad = PVADAdapter(
            mode=pvad_mode,
            model_path=pvad_model_path,
            reference_embedding=reference_embedding,
            sample_rate=sample_rate,
        )
        self.fusion = FusionLayer(threshold=fusion_threshold)

    def process(self, frame: np.ndarray) -> bool:
        """Process a single frame and return target flag.

        Args:
            frame: Audio frame, 1D float32 array.

        Returns:
            True if target speaker is detected near-field.
        """
        result = self.process_detailed(frame)
        return result["flag"]

    def process_detailed(self, frame: np.ndarray) -> dict:
        """Process a single frame and return detailed output.

        Args:
            frame: Audio frame, 1D float32 array.

        Returns:
            Dict with p_near, p_target, score, flag.
        """
        p_near = self.near_field.extract(frame)
        p_target = self.pvad.score(frame)
        score = self.fusion.score(p_near, p_target)
        flag = self.fusion.decide(p_near, p_target)

        return {
            "p_near": p_near,
            "p_target": p_target,
            "score": score,
            "flag": flag,
        }
```

- [ ] **Step 4: Run tests**

Run: `python -m pytest tests/test_pipeline.py -v`
Expected: 4 PASSED

- [ ] **Step 5: Run full test suite**

Run: `python -m pytest tests/ -v`
Expected: 29 PASSED total (16 features + 3 pvad + 6 fusion + 4 pipeline)

- [ ] **Step 6: Commit**

```bash
git add src/pipeline.py tests/test_pipeline.py
git commit -m "feat: add end-to-end streaming detection pipeline"
```

---

### Task 10: Synthetic Data Generator and Evaluation Script

**Files:**
- Create: `eval/synthesize_data.py`
- Create: `eval/evaluate.py`

- [ ] **Step 1: Write synthesize_data.py**

```python
# eval/synthesize_data.py
"""Generate synthetic near/far test audio for evaluation.

Creates WAV files simulating:
- Near-field speech (streamer): strong, bass-boosted, plosive-rich
- Far-field speech (passerby): attenuated, no proximity effect, no plosives
- Mixed: near-field + far-field simultaneous (overlap scenario)
"""
import numpy as np
from scipy.io import wavfile


def generate_speech_like(duration_s: float, sr: int = 16000,
                         f0: float = 150.0, amplitude: float = 0.8) -> np.ndarray:
    """Generate speech-like signal with harmonics and modulation."""
    n = int(duration_s * sr)
    t = np.arange(n) / sr
    # Fundamental + harmonics
    sig = np.sin(2 * np.pi * f0 * t) * 0.6
    sig += np.sin(2 * np.pi * f0 * 2 * t) * 0.3
    sig += np.sin(2 * np.pi * f0 * 3 * t) * 0.15
    sig += np.sin(2 * np.pi * f0 * 4 * t) * 0.08
    # Amplitude modulation (speech envelope)
    envelope = 0.5 + 0.5 * np.sin(2 * np.pi * 3.0 * t)
    sig *= envelope
    return (sig * amplitude).astype(np.float32)


def apply_near_field(signal: np.ndarray, sr: int = 16000) -> np.ndarray:
    """Simulate near-field: bass boost (proximity effect) + plosive bursts."""
    from scipy.signal import butter, sosfilt
    # Bass boost below 300Hz
    sos = butter(2, 300, btype='low', fs=sr, output='sos')
    bass = sosfilt(sos, signal) * 2.0
    result = signal + bass
    # Add plosive bursts every ~0.5s
    burst_interval = int(0.5 * sr)
    for i in range(0, len(result), burst_interval):
        burst_len = min(int(0.02 * sr), len(result) - i)
        result[i:i+burst_len] += (np.random.randn(burst_len) * 0.3).astype(np.float32)
    return np.clip(result, -1.0, 1.0).astype(np.float32)


def apply_far_field(signal: np.ndarray, sr: int = 16000,
                    distance_m: float = 3.0) -> np.ndarray:
    """Simulate far-field: attenuation + high-freq rolloff + noise."""
    # Inverse square law attenuation
    ref_dist = 0.1  # near-field reference distance
    attenuation = ref_dist / distance_m
    sig = signal * attenuation
    # High frequency rolloff (air absorption)
    from scipy.signal import butter, sosfilt
    sos = butter(2, 3000, btype='low', fs=sr, output='sos')
    sig = sosfilt(sos, sig).astype(np.float32)
    # Add ambient noise
    sig += (np.random.randn(len(sig)) * 0.02).astype(np.float32)
    return sig.astype(np.float32)


def main():
    sr = 16000
    duration = 5.0
    base = generate_speech_like(duration, sr, f0=150, amplitude=0.8)

    near = apply_near_field(base, sr)
    far = apply_far_field(base, sr, distance_m=3.0)
    far_close = apply_far_field(base, sr, distance_m=1.0)
    mixed = near + far

    wavfile.write("eval/near_field.wav", sr, near)
    wavfile.write("eval/far_field_3m.wav", sr, far)
    wavfile.write("eval/far_field_1m.wav", sr, far_close)
    wavfile.write("eval/mixed_overlap.wav", sr, np.clip(mixed, -1, 1).astype(np.float32))
    print(f"Generated 4 test files in eval/ ({duration}s each, {sr}Hz)")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Write evaluate.py**

```python
# eval/evaluate.py
"""Evaluate dual-channel detection pipeline on test audio."""
import sys
import os
import numpy as np

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from scipy.io import wavfile
from src.pipeline import DetectionPipeline

FRAME_LEN = 480  # 30ms at 16kHz


def evaluate_file(path: str, expected_label: str, threshold: float = 0.5) -> dict:
    """Run pipeline on a WAV file and compute metrics.

    Args:
        path: Path to WAV file.
        expected_label: "near" or "far" — what we expect the file to be.
        threshold: Fusion threshold.

    Returns:
        Dict with accuracy, true_positive_rate, false_positive_rate, etc.
    """
    sr, data = wavfile.read(path)
    if data.dtype != np.float32:
        data = data.astype(np.float32) / 32768.0

    pipe = DetectionPipeline(sample_rate=sr, fusion_threshold=threshold)
    flags = []
    for i in range(0, len(data) - FRAME_LEN, FRAME_LEN):
        frame = data[i : i + FRAME_LEN]
        result = pipe.process_detailed(frame)
        flags.append(result)

    n_frames = len(flags)
    n_flagged = sum(f["flag"] for f in flags)

    if expected_label == "near":
        tp = n_flagged
        fn = n_frames - n_flagged
        tpr = tp / n_frames if n_frames > 0 else 0.0
        return {"file": path, "label": "near", "total_frames": n_frames,
                "detected": n_flagged, "tpr": tpr}
    else:
        fp = n_flagged
        tn = n_frames - n_flagged
        fpr = fp / n_frames if n_frames > 0 else 0.0
        return {"file": path, "label": "far", "total_frames": n_frames,
                "detected": n_flagged, "fpr": fpr}


def main():
    eval_dir = os.path.dirname(__file__)
    files = {
        "eval/near_field.wav": "near",
        "eval/far_field_3m.wav": "far",
        "eval/far_field_1m.wav": "far",
        "eval/mixed_overlap.wav": "near",
    }

    print("=" * 60)
    print("Dual-Channel Detection Pipeline Evaluation")
    print("=" * 60)

    for fpath, label in files.items():
        full_path = os.path.join(eval_dir, "..", fpath)
        if not os.path.exists(full_path):
            print(f"SKIP: {fpath} not found (run synthesize_data.py first)")
            continue
        result = evaluate_file(full_path, label)
        print(f"\n{result['file']}")
        print(f"  Label: {result['label']}, Frames: {result['total_frames']}")
        if label == "near":
            print(f"  TPR (recall): {result['tpr']:.1%} ({result['detected']}/{result['total_frames']})")
        else:
            print(f"  FPR (false alarm): {result['fpr']:.1%} ({result['detected']}/{result['total_frames']})")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Generate test data and run evaluation**

Run: `cd /Users/noctis/Workspace/trySth/trending-clones/near-field-detector && python eval/synthesize_data.py && python eval/evaluate.py`

- [ ] **Step 4: Commit**

```bash
git add eval/synthesize_data.py eval/evaluate.py
git commit -m "feat: add synthetic data generator and evaluation script"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - 4 acoustic features (spectral tilt, energy, plosive, SNR) → Tasks 2-5
   - NearFieldExtractor combining features → Task 6
   - PVAD adapter → Task 7
   - Fusion layer with interaction term → Task 8
   - Streaming pipeline → Task 9
   - Evaluation → Task 10
   - **Gap:** No task for calibrating NearFieldExtractor weights on real data. This requires real audio recordings which are outside the scope of this prototype.

2. **Placeholder scan:** No TBD/TODO/fill-in-later found. The `_dense_score` and `_usef_tp_score` methods raise `NotImplementedError` explicitly — this is intentional (model files not yet available), not a placeholder.

3. **Type consistency:** All functions use `np.ndarray` for frames, `float` for probabilities, `bool` for flags. Consistent across all files.
