#!/usr/bin/env python3
"""Generate calibration signal audio samples for the dual-mic report."""

import numpy as np
from scipy.io import wavfile
from scipy.signal.windows import tukey
import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))
FS = 48000  # 48kHz sample rate


def save_wav(name, signal, fs=FS):
    """Save signal as 16-bit WAV file."""
    # Normalize to [-1, 1] then scale to 16-bit
    peak = np.max(np.abs(signal))
    if peak > 0:
        signal = signal / peak * 0.9  # leave 10% headroom
    data = (signal * 32767).astype(np.int16)
    path = os.path.join(OUT_DIR, name)
    wavfile.write(path, fs, data)
    duration_ms = len(signal) / fs * 1000
    print(f"  ✓ {name}: {len(signal)} samples, {duration_ms:.1f}ms")


# ============================================================
# 1. LFM Chirp (Recommended) — 200Hz→8kHz, 50ms, Tukey window
# ============================================================
print("\n1. LFM Chirp (推荐)")
f0, f1, T = 200, 8000, 0.05
t = np.arange(0, T, 1.0 / FS)
k = (f1 - f0) / T
chirp_lfm = np.sin(2 * np.pi * f0 * t + np.pi * k * t**2)
window = tukey(len(chirp_lfm), alpha=0.5)
chirp_lfm *= window
save_wav("01_chirp_lfm_200Hz-8kHz_50ms.wav", chirp_lfm)

# ============================================================
# 2. LFM Chirp (Extended) — 200Hz→16kHz, 100ms, Hamming + fade
# ============================================================
print("\n2. LFM Chirp (扩展版)")
f0, f1, T = 200, 16000, 0.1
t = np.arange(0, T, 1.0 / FS)
k = (f1 - f0) / T
chirp_ext = np.cos(2 * np.pi * (f0 * t + 0.5 * k * t**2))
chirp_ext *= np.hamming(len(chirp_ext))
# Cosine-squared fade in/out (5ms)
fade_n = int(FS * 0.005)
fade_in = np.sin(np.linspace(0, np.pi / 2, fade_n)) ** 2
fade_out = np.cos(np.linspace(0, np.pi / 2, fade_n)) ** 2
chirp_ext[:fade_n] *= fade_in
chirp_ext[-fade_n:] *= fade_out
save_wav("02_chirp_lfm_200Hz-16kHz_100ms.wav", chirp_ext)

# ============================================================
# 3. ESS (Exponential Sine Sweep) — 200Hz→8kHz, 500ms
# ============================================================
print("\n3. ESS (指数扫频)")
f0, f1, T = 200, 8000, 0.5
t = np.arange(0, T, 1.0 / FS)
L = T
K = 2 * np.pi * f0 * L / np.log(f1 / f0)
ess = np.sin(K * (np.exp(t / L * np.log(f1 / f0)) - 1))
# Apply gentle fade
fade_n = int(FS * 0.005)
fade_in = np.sin(np.linspace(0, np.pi / 2, fade_n)) ** 2
fade_out = np.cos(np.linspace(0, np.pi / 2, fade_n)) ** 2
ess[:fade_n] *= fade_in
ess[-fade_n:] *= fade_out
save_wav("03_ess_200Hz-8kHz_500ms.wav", ess)

# ============================================================
# 4. MLS (Maximum Length Sequence) — n=10, P=1023
# ============================================================
print("\n4. MLS (最大长度序列)")
n = 10
P = 2**n - 1  # 1023
# LFSR with feedback polynomial x^10 + x^3 + 1
register = [1] * n
mls = []
for _ in range(P):
    mls.append(register[-1])
    # Feedback: tap positions 10 and 3 (0-indexed: 9 and 2)
    feedback = register[9] ^ register[2]
    register = [feedback] + register[:-1]
# Convert {0,1} to {-1,+1}
mls = np.array([1 if b == 1 else -1 for b in mls], dtype=float)
# Repeat twice for better audibility + apply fade
mls_signal = np.tile(mls, 2)
fade_n = int(FS * 0.003)
fade_in = np.sin(np.linspace(0, np.pi / 2, fade_n)) ** 2
fade_out = np.cos(np.linspace(0, np.pi / 2, fade_n)) ** 2
mls_signal[:fade_n] *= fade_in
mls_signal[-fade_n:] *= fade_out
save_wav("04_mls_n10_P1023.wav", mls_signal)

# ============================================================
# 5. Near-ultrasonic Chirp — 16.5kHz→19.5kHz, 50ms
# ============================================================
print("\n5. 近超声 Chirp")
f0, f1, T = 16500, 19500, 0.05
t = np.arange(0, T, 1.0 / FS)
k = (f1 - f0) / T
chirp_ultra = np.sin(2 * np.pi * f0 * t + np.pi * k * t**2)
window = tukey(len(chirp_ultra), alpha=0.5)
chirp_ultra *= window
save_wav("05_chirp_ultrasonic_16.5kHz-19.5kHz_50ms.wav", chirp_ultra)

# ============================================================
# 6. Golay Complementary Pair — N=1024
# ============================================================
print("\n6. Golay 互补序列对")
N = 1024
a, b = np.array([1.0]), np.array([1.0])
while len(a) < N:
    a, b = np.concatenate([a, b]), np.concatenate([a, -b])
# Add guard interval between A and B (15ms silence)
guard_samples = int(FS * 0.015)
golay_combined = np.concatenate([a, np.zeros(guard_samples), b])
# Apply fade
fade_n = int(FS * 0.003)
fade_in = np.sin(np.linspace(0, np.pi / 2, fade_n)) ** 2
fade_out = np.cos(np.linspace(0, np.pi / 2, fade_n)) ** 2
golay_combined[:fade_n] *= fade_in
golay_combined[-fade_n:] *= fade_out
save_wav("06_golay_pair_N1024.wav", golay_combined)
# Also save A and B separately
save_wav("06a_golay_A_N1024.wav", a)
save_wav("06b_golay_B_N1024.wav", b)

# ============================================================
# 7. Pilot Tone — 18kHz, 200ms
# ============================================================
print("\n7. 导频音 Pilot Tone")
f_pilot, T = 18000, 0.2
t = np.arange(0, T, 1.0 / FS)
pilot = 0.3 * np.sin(2 * np.pi * f_pilot * t)
# Gentle amplitude modulation (fade in/out)
fade_n = int(FS * 0.02)  # 20ms fade
fade_in = np.sin(np.linspace(0, np.pi / 2, fade_n)) ** 2
fade_out = np.cos(np.linspace(0, np.pi / 2, fade_n)) ** 2
pilot[:fade_n] *= fade_in
pilot[-fade_n:] *= fade_out
save_wav("07_pilot_tone_18kHz_200ms.wav", pilot)

# ============================================================
# Summary
# ============================================================
print("\n" + "=" * 60)
print(f"生成完成！所有文件保存在: {OUT_DIR}")
print(f"共生成 9 个 WAV 文件 (48kHz, 16-bit)")
print("=" * 60)
