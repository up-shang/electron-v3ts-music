import { Howl, Howler } from 'howler'
import pinia from '../store'
import { usePlayerStore } from '../store'

const playerStore = usePlayerStore(pinia)

const PLAY_PAUSE_FADE_DURATION: number = 200;

export default class {
  // 播放器状态
  private _playing: boolean = false // 是否正在播放中
  private _progress: number = 0 // 当前播放歌曲的进度
  private _currentTime: string = '00:00' // 当前播放分秒
  private _timer: any = 0 // 计时器id
  private _repeatMode: string = 'off' //重复 off | on | one
  private _shuffle: boolean = false; // 随机 true | false
  private _reversed: boolean = false; // 循环
  private _volume: number = 1; // 声音 0 to 1
  // 播放信息, any需定义type替代，懒暂时不加
  private _list: any[] = [] // 播放列表
  private _current = 0 // 当前播放歌曲在播放列表里的index
  private _shuffledList: any[] = [] // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
  private _shuffledCurrent = 0 // 当前播放歌曲在随机列表里面的index
  private _playlistSource: any = { type: 'album', id: 123 } // 当前播放列表的信息
  private _currentTrack: any = { id: 86827685 } // 当前播放歌曲的详细信息
  private _playNextList: any[] = [] // 当这个list不为空时，会优先播放这个list的歌

  private _howler: any
  // 初始化
  constructor() {
    this._init()
  }

  get volume() {
    return this._volume;
  }
  set volume(volume) {
    this._volume = volume;
    Howler.volume(volume);
  }
  get list() {
    return playerStore.list as any[];
  }
  // set list(list) {
  //   this._list = list;
  // }
  get current() {
    return this._current
  }
  set current(current) {
    this._current = current
  }
  get playing() {
    return this._playing;
  }
  get currentTrack() {
    return this._currentTrack;
  }
  get currentTrackID() {
    return this._currentTrack?.id ?? 0;
  }
  get currentTrackDuration() {
    const trackDuration = this._currentTrack.dt || 1000;
    let duration: number = ~~(trackDuration / 1000); // ~~去除小数
    return duration > 1 ? duration - 1 : duration;
  }
  get progress() {
    return this._progress;
  }
  set progress(value) {
    if (this._howler) {
      this._howler.seek(value);
    }
  }

  get currentTime(): string {
    return this._currentTime
  }
  _init() {
    Howler.volume(this.volume)
  }
  _setPlaying(isPlaying: boolean) {
    this._playing = isPlaying
  }
  _nextTrackCallback() {
    this.pause()
    this.playAudioSource(this._getNextTrack())
    this.play()
  }
  _preTrackCallback() {
    this.pause()
    this.playAudioSource(this._getPrevTrack())
    this.play()
  }
  _getNextTrack() {
    const next = this.current + 1 > (playerStore.list as any[]).length ? this.current : this.current + 1
    this._current = next
    playerStore.setTrackInfo((playerStore.allListInfo as any[])[next])
    console.log(this._current, ' ====== next')
    return [this.list[next]];
  }
  _getPrevTrack() {
    const pre = this.current - 1 < 0 ? this.current : this.current - 1
    this._current = pre
    playerStore.setTrackInfo((playerStore.allListInfo as any[])[pre])
    return [this.list[pre]];
  }
  playAudioSource(source: any, autoplay = false) {
    Howler.unload();
    this._howler = new Howl({
      src: source,
      html5: true,
      preload: true,
      format: ['mp3', 'flac'],
      onend: () => {
        this._nextTrackCallback();
      },
    });
    this._howler.on('loaderror', (_: any, errCode: any) => {
    });
    if (autoplay) {
      this.play();
    }
  }

  formatTime(secs: any) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs - minutes * 60) || 0;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  _setTimeAndProgress() {
    // 同步播放进度
    if (this._howler === null) return;
    this._timer = setInterval(() => {
      this._progress = this._howler.seek();
      this._currentTime = this.formatTime(Math.round(this._progress))
      // console.log(this._progress, this._currentTime, this._playing)
      // localStorage.setItem('playerCurrentTrackTime', this._progress);
    }, 1000)
  }
  seek(time: any) {
    if (time !== null) {
      this.pause()
      this._howler?.seek(time);
      this.play()
    }
    return this._howler === null ? 0 : this._howler.seek();
  }
  play() {
    if (this._howler?.playing()) return;
    this._howler?.play();
    this._howler?.once('play', () => {
      console.log('========onplay=========')
      this._setTimeAndProgress()
      this._setPlaying(true);
      this._howler?.fade(0, this.volume, PLAY_PAUSE_FADE_DURATION);
      // todo 更新store中当前播放歌曲信息
    });
  }
  pause() {
    clearInterval(this._timer)
    // 淡入淡出
    this._howler?.fade(this.volume, 0, PLAY_PAUSE_FADE_DURATION);
    this._setPlaying(false);
    this._howler?.pause();
  }
  playOrPause() {
    if (this._howler?.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }
}