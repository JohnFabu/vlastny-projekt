function alarmActive () {
    smarthome.Relay(DigitalPin.P16, smarthome.RelayStateList.Off)
    music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.ForeverInBackground)
    basic.showIcon(IconNames.Skull)
}
function ClearDisplay () {
    OLED.clear()
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        OLED.writeString("dvere sú zatvorené")
    } else {
        OLED.writeString("dvere sú otvorené")
    }
    OLED.newLine()
}
function AlarmTurnOn () {
    for (let index = 0; index <= pocitadlo; index++) {
        basic.showNumber(pocitadlo - index)
        music.playTone(988, music.beat(BeatFraction.Whole))
    }
    basic.showIcon(IconNames.Sad)
    OLED.writeStringNewLine("alarmON")
    alarmOn = 1
}
let alarmOn = 0
let pocitadlo = 0
smarthome.crashSensorSetup(DigitalPin.P2)
pocitadlo = 3
OLED.init(128, 64)
basic.forever(function () {
    ClearDisplay()
    if (input.buttonIsPressed(Button.A)) {
        AlarmTurnOn()
        if (!(smarthome.crashSensor()) && alarmOn == 1) {
            alarmActive()
            OLED.writeStringNewLine("alarmCrash")
        }
        if (smarthome.PIR(DigitalPin.P1) && alarmOn == 1) {
            alarmActive()
            OLED.writeStringNewLine("alarmPIR")
        }
    }
    if (input.buttonIsPressed(Button.B)) {
        smarthome.Relay(DigitalPin.P16, smarthome.RelayStateList.On)
        alarmOn = 0
        music.stopAllSounds()
        OLED.writeStringNewLine("alarmOFF")
    }
})
