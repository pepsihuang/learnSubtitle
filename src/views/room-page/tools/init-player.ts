import Shikwasa from "shikwasa2"
import { Ref } from "vue"
import playerTool from "./player-tool"

export interface PlayerCallbacks {
  durationchange?: (duration?: number) => void
  canplay?: (e: Event) => void
  loadeddata?: (e: Event) => void
  pause?: (e: Event) => void
  playing?: (e: Event) => void
  ratechange?: (e: Event) => void
  seeked?: (e: Event) => void
}

export interface AudioData {
  src: string
  title?: string
  cover?: string
  artist?: string
  album?: string
}

export function initPlayer(
  playerEl: Ref, 
  audioData: AudioData, 
  callbacks: PlayerCallbacks,
  onBeforeClick: (target: string) => boolean,
): any {
  let player = new Shikwasa({
    container: () => playerEl.value,
    audio: audioData,
    themeColor: "var(--text-color)",
    speedOptions: playerTool.initSpeedOptions(),
    onBeforeClick,
  })

  player.on("audioupdate", (e: Event) => {})

  player.on("audioparse", (e: Event) => {})

  // 去监听 播放器的各个事件回调
  player.on("abort", (e: Event) => {
    console.log("player abort.............")
    console.log(e)
    console.log(" ")
  })

  player.on("complete", (e: Event) => {})

  player.on("durationchange", (e: any) => {
    let myAudio = e?.path?.[0]
    if(!myAudio) {
      myAudio = e?.srcElement
    }
    let duration = myAudio?.duration

    console.log("看一下音频总时长: ", duration)
    console.log(" ")
    callbacks.durationchange && callbacks.durationchange(duration)
  })

  player.on("emptied", (e: Event) => {
    console.log("player emptied.............")
    console.log(e)
    console.log(" ")
  })

  player.on("ended", (e: Event) => {})

  player.on("error", (e: Event) => {
    console.log("player error.............")
    console.log(e)
    console.log(" ")
  })

  player.on("canplay", (e: Event) => {
    if(!playerTool.checkThrottle("canplay")) return
    callbacks.canplay && callbacks.canplay(e)
  })

  player.on("loadeddata", (e: Event) => {
    console.log("player loaded data.........")
    console.log(e)
    console.log(" ")
    
    callbacks.loadeddata && callbacks.loadeddata(e)
  })

  player.on("pause", (e: Event) => {
    if(!playerTool.checkThrottle("pause")) return
    callbacks.pause && callbacks.pause(e)
  })

  player.on("playing", (e: Event) => {
    if(!playerTool.checkThrottle("play")) return
    callbacks.playing && callbacks.playing(e)
  })

  player.on("ratechange", (e: Event) => {
    if(!playerTool.checkThrottle("speed")) return
    callbacks.ratechange && callbacks.ratechange(e)
  })

  player.on("seeking", (e: Event) => {
    // console.log("seeking..................")
    // console.log(e)
    // console.log(" ")
  })

  player.on("seeked", (e: Event) => {
    if(!playerTool.checkThrottle("seek")) return
    callbacks.seeked && callbacks.seeked(e)
  })

  player.on("waiting", (e: Event) => {
    console.log("player waiting.............")
    console.log(e)
    console.log(" ")
  })

  console.log("已创建播放器........................")
  console.log(" ")

  return player
}
