/* eslint no-undef: 0 */
const { execSync } = require('child_process')

const OPTIONS = {
  timeout: 10000,
  killSignal: 'SIGKILL'
}

describe('screenshot',  () => {
  beforeEach(async () => {
    await device.launchApp()
    await device.reloadReactNative()
  })
  it('should take screenshots', async () => {
    const fileName = 'home.jpg'
    if (device.getPlatform() === 'android') {
      execSync(`adb shell screencap /sdcard/${fileName}`, OPTIONS)
      execSync(`adb pull /sdcard/${fileName} $(pwd)/android/fastlane/metadata/android/en-GB/images/phoneScreenshots/`, OPTIONS)
    } else {
      execSync(`xcrun simctl io booted screenshot $(pwd)/ios/fastlane/screenshots/${fileName}`, OPTIONS)
    }
  })
})
