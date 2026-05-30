# Near-Field + Identity Dual-Channel Target Speaker Detection

**Date**: 2026-05-30
**Status**: Approved
**Context**: Outdoor live-streaming, streamer wears lavalier mic (~10-20cm), need to flag streamer speech while rejecting nearby passersby (~1-5m).

## Problem Statement

Distinguish the streamer's speech (near-field, ~10-20cm from mic) from passersby speech (far-field, ~1-5m) in a streaming audio pipeline. Single-channel audio, pure software solution, <3MB total model size, <50ms latency.

## Design: Dual-Channel Fusion

### Architecture

```
Audio Stream (16kHz, mono)
        |
        +---------------------+
        |                     |
        v                     v
Acoustic Proximity       Identity Channel
Channel (DSP)            (Personal VAD)
        |                     |
        v                     v
   P(near)  ----------  P(target)
                  |
                  v
          Fusion Layer
                  |
                  v
            Target Flag (0/1 per frame)
```

### Channel 1: Acoustic Proximity Features (DSP, ~10KB)

Four handcrafted features extracted per frame (~30ms), combined via a tiny classifier (<100 params):

| # | Feature | Computation | Near-field | Far-field | Discriminability |
|---|---------|-------------|------------|-----------|------------------|
| 1 | **Spectral Tilt** | LowFreq(50-300Hz) energy / HighFreq(2k-4kHz) energy | +6~12dB bass boost | Normal decay | Very high |
| 2 | **Frame Energy** | log(sum(frame^2)) | ~30dB louder | Quieter | High |
| 3 | **Plosive Score** | Transient detection in 4-8kHz band | Visible bursts | Invisible | Very high |
| 4 | **SNR Estimate** | Speech energy / background noise floor | High direct-to-ambient | Low | Medium-high |

Output: P(near) in [0, 1]

Computation cost: ~5ms per frame (FFT + subband energy). Negligible memory.

### Channel 2: Identity (Personal VAD, ~1-2MB)

Options prioritized from v2.0 research:

1. **DENSE** (Causal TCN, ~1ms latency, open source: github.com/wyw97/DENSE) -- preferred for lowest latency
2. **USEF-TP** (Embedding-free, open source: github.com/ZBang/USEF-TSE) -- preferred for simplicity
3. **Personal VAD 2.0** (Conformer, 1.0MB INT8) -- preferred for smallest model size

Output: P(target) in [0, 1]

### Fusion Layer

Simple weighted combination:

```
score = w1 * P(near) + w2 * P(target) + w3 * P(near) * P(target)
flag  = score > threshold
```

4 learnable parameters (w1, w2, w3, threshold). Can be calibrated offline or adapted online.

The interaction term `P(near) * P(target)` captures the joint probability that the sound is both near-field AND from the target speaker.

### Latency Budget

| Component | Latency |
|-----------|---------|
| Acoustic features | ~5ms |
| PVAD inference | ~30ms |
| Fusion | <1ms |
| **Total** | **~30ms** (bottleneck is PVAD) |

### Model Size Budget

| Component | Size |
|-----------|------|
| Acoustic feature extractor | <10KB (DSP code) |
| Fusion layer | <1KB |
| PVAD model | 1-2MB |
| **Total** | **~1-2MB** |

## Why This Works for Outdoor

Outdoor environments lack reverberation, which makes acoustic proximity features *cleaner* than indoors:
- No reflections to contaminate DRR measurements
- Proximity effect is a pure physics phenomenon, independent of room acoustics
- Plosive detection is more reliable without reverb smearing
- The ~30dB level difference from inverse-square law is unambiguous

## Why Dual-Channel Beats Single-Channel

Two independent signals provide orthogonal evidence:
- **Acoustic channel**: "Is this sound coming from very close to the mic?"
- **Identity channel**: "Is this the voice of the enrolled speaker?"

A far-field passerby who happens to sound like the streamer (false positive on identity) will still fail the near-field test. A near-field non-speech sound (false positive on proximity) will fail the identity test. The AND-like fusion dramatically reduces false positives.

## Implementation Phases

1. **Phase 1**: Implement acoustic proximity features standalone, validate discriminability on real data
2. **Phase 2**: Integrate PVAD (DENSE or USEF-TP), validate identity channel
3. **Phase 3**: Fusion layer calibration, end-to-end testing
4. **Phase 4**: Optimize for target hardware, quantize if needed

## Success Criteria

- Target speaker F1 > 0.90 in typical outdoor conditions
- False positive rate < 5% when passerby speaks within 3m
- End-to-end latency < 50ms
- Total model size < 3MB
- Runs on ARM Cortex-M class hardware or mobile CPU

## Risks

| Risk | Mitigation |
|------|-----------|
| Wind noise corrupts spectral tilt | Use mic's built-in wind protection; add wind detection pre-filter |
| Streamer speaks softly (low energy) | P(near) not solely dependent on energy; plosive/tilt features compensate |
| Passerby speaks very close (<1m) | Identity channel disambiguates; fusion interaction term helps |
| Outdoor noise bursts (traffic, etc) | VAD pre-filter ensures only speech frames are evaluated |
