"""Original procedural cinematic cues; no sampled voices or soundtrack material.
22050 Hz stereo PCM. Fixed seed, soft saturation, peak <= 0.68.
"""
from pathlib import Path
import json, wave
import numpy as np
from scipy.signal import butter, sosfilt
SR=22050
OUT=Path(__file__).resolve().parents[1]/'assets/mesbg/audio'
OUT.mkdir(parents=True,exist_ok=True)
rng=np.random.default_rng(1041426)
def time(seconds):return np.arange(round(SR*seconds))/SR
def env(t,attack=.12,release=.5):return np.minimum(1,t/attack)*np.minimum(1,(t[-1]-t)/release)
def band(x,low,high):return sosfilt(butter(3,[low,high],btype='bandpass',fs=SR,output='sos'),x)
def save(name,x,seconds):
 t=time(seconds);x=x[:len(t)]*env(t,.06,.3);x=np.tanh(x*1.4);x*=.68/max(.01,np.max(np.abs(x)))
 left=x.copy();right=x.copy()
 for delay,amount in [(.071,.13),(.173,.09),(.337,.065)]:
  k=round(SR*delay);left[k:]+=x[:-k]*amount;right[k+113:]+=x[:-(k+113)]*amount
 stereo=np.column_stack([left,right]);stereo*=.68/max(.01,np.max(np.abs(stereo)))
 with wave.open(str(OUT/(name+'.wav')),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes(np.int16(stereo*32767).tobytes())
 return {'file':'audio/'+name+'.wav','seconds':seconds,'peak':float(np.max(np.abs(stereo))),'rms':float(np.sqrt(np.mean(stereo**2))),'sampleRate':SR,'channels':2}
metrics=[]
# A torn, three-voice wail: rising glottal pulses, detuned throats, formant noise,
# flutter and descending tail. Rendered, not sampled or copied from the films.
t=time(4.2);x=np.zeros_like(t)
for shift,detune,weight in [(0,1,.58),(.21,.79,.29),(.49,1.27,.23)]:
 z=np.maximum(0,t-shift);f=(210+550*(1-np.exp(-z*3.5)))*detune*(1+.042*np.sin(2*np.pi*9.3*z))
 f*=np.where(z>1.65,np.maximum(.47,1-(z-1.65)*.19),1)
 phase=2*np.pi*np.cumsum(f)/SR;voice=np.zeros_like(t)
 for k in range(1,13):voice+=np.sin(phase*k+.18*np.sin(2*np.pi*21*z))/(k**.75)*np.exp(-((k*f-1900)/1800)**2)
 air=band(rng.normal(0,.3,len(t)),950,5100)
 voice=band(voice,280,5100)+air*(.6+.4*np.sin(2*np.pi*31*z))
 envelope=(t>=shift)*np.minimum(1,z/.13)*np.exp(-np.maximum(0,z-1.05)*1.25)
 x+=weight*voice*envelope
metrics.append(save('boss_nazgul_shriek',x,4.2))
# Leather/membrane wing sweep with a low pressure thump.
t=time(1.5);x=band(rng.normal(0,.45,len(t)),90,1450)*np.sin(np.pi*t/1.5)**2
x+=.7*np.sin(2*np.pi*(75*t-18*t*t))*np.exp(-t*4)
metrics.append(save('boss_fell_wing',x,1.5))
# A forged ring seated against black steel; inharmonic metal partials.
t=time(2.5);x=np.zeros_like(t)
for f,w in [(330,.35),(494,.2),(739,.14),(1139,.1),(1711,.055),(2801,.03)]:x+=w*np.sin(2*np.pi*f*t)*np.exp(-t*(1.5+f/1700))
x+=band(rng.normal(0,.25,len(t)),850,6200)*np.exp(-t*28)
metrics.append(save('boss_ring_seal',x,2.5))
# Low malevolent chord under the gauntlet, four voices and restrained air.
t=time(6.5);x=np.zeros_like(t)
for f,w in [(55,.34),(82.4,.16),(116.54,.12),(155.56,.08)]:x+=w*(np.sin(2*np.pi*f*t)+.18*np.sin(2*np.pi*f*2.003*t))
x*=env(t,.6,1.5)*(.82+.18*np.sin(2*np.pi*.67*t))
x+=band(rng.normal(0,.06,len(t)),140,900)*env(t,.8,2)
metrics.append(save('boss_dark_omen',x,6.5))
(OUT/'boss-cinematic-audio.json').write_text(json.dumps({'generator':Path(__file__).name,'original':True,'cues':metrics},indent=2)+'\n')
print(json.dumps(metrics,indent=2))
