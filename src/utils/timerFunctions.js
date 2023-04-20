export function startCountdown(timer, startConfig) {
  timer.start({
    startValues: startConfig,
    target: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    countdown: true,
  })
}

export function stopTimer(timer) {
  timer.stop()
}

export function pauseTimer(timer) {
  timer.pause()
}
export function resetTimer(timer) {
  timer.reset()
}