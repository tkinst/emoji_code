<template>
  <div class="home">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary" align-center>
              <v-toolbar-title>🐶 EmojiCode 🐶</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-title @click="emojiSelf">😻🏯🥙🛐✉️🐲</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
          >
            {{ snackbar_text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
              <v-form>
                <div >
                  <v-text-field
                    outlined
                          v-model="inText"
                          label="Paste Your Text"
                          v-mask="textMask"
                          hint="Only letters, numbers, spaces, and dash/underscore characters."
                          persistent-hint
                          class='mb-2'
                          @focus="$event.target.select()"
                        ></v-text-field>

                  <v-textarea
                    outlined
                    readonly
                    name="input-7-4"
                    label="EmojiCode (Tap to copy)"
                    :value="toEmoji"
                    @click="copyEmojiCode"
                    v-touch:tap="copyEmojiCode"
                  ></v-textarea>
                </div>
                <div class='mb-8'>
                <v-divider></v-divider>
                </div>
                <div>
                  <v-text-field
                    outlined
                    v-model="inEmoji"
                    label="Paste Your EmojiCode"
                    hint="Only emoji generated from EmojiCode."
                    :rules="[emojiMask]"
                    persistent-hint
                    class='mb-2'
                    @focus="$event.target.select()"
                  ></v-text-field>
                  <v-textarea
                    outlined
                    readonly
                    name="input-7-4"
                    label="Text (Tap to copy)"
                    :value="toText"
                    @click="copyTextCode"
                    v-touch:tap="copyTextCode"
                  ></v-textarea>
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Player from '@/components/Player.vue'
// const emojiRegex = require('emoji-regex/text.js')
const emojiRegex = require('emoji-regex/RGI_Emoji.js')
const { indexOf } = require('stringz')
const bigInt = require('big-integer')

export function textMaskRegex (value) {
  // const hours = [
  //   /[0-2]/,
  //   value.charAt(0) === '2' ? /[0-3]/ : /[0-9]/
  // ]
  // const minutes = [/[0-5]/, /[0-9]/]
  // return value.length > 2 // if
  //   ? [...hours, ':', ...minutes] // then
  //   : hours // else

  const pat = /[0-9 A-Za-z_-]/
  const textValid = new Array(1000).fill(pat)
  return textValid
}

export default {
  name: 'Home',
  data () {
    return {
      inText: '',
      inEmoji: '',
      textMask: textMaskRegex,
      timeout: 2000,
      snackbar: false,
      snackbar_text: 'Copied to clipboard!',
      emojiMask: value => {
        const pattern = /[0-9 A-Za-z_-]/
        return !pattern.test(value) || 'Invalid EmojiCode'
      },
      ascii_list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_0123456789 ',
      emoji_list: ['✡️', '🚤', '😻', '🍛', '🚬', '🇼🇸', '🥒', '🇻🇬', '🇵🇼', '🌆', '💴', '💽', '😿', '🔷', '📑', '🔓', '💧', '🌃', '👊', '🇳🇨', '🇻🇮', '🇵🇷', '🎲', '💷', '🏯', '👖', '🤣', '🏤', '🍠', '🤏', '🦨', '✍️', '🇪🇹', '♠️', '🇨🇦', '🔟', '🦪', '😛', '💵', '🚴', '😾', '🇸🇱', '👕', '🙊', '🎁', '🇸🇽', '🌰', '🛑', '🙋', '☘️', '❎', '💩', '🚜', '🛺', '🇸🇻', '🇵🇾', '🐜', '🤲', '🦜', '🤳', '🍩', '🧏', '🇬🇼', '◼️', '🇨🇨', '🧿', '🔐', '♣️', '🔻', '🌼', 'ℹ️', '🇰🇵', '😸', '🚰', '🧉', '🧽', '🟧', '👲', '🏃', '🦑', '🟢', '👝', '👛', '🚾', '🃏', '🎅', '🚂', '👎', '🤚', '🍷', '🇱🇻', '🇦🇴', '🚀', '🖤', '❔', '🚋', '🧝', '🌏', '🍶', '🧥', '🙎', '🇪🇪', '😅', '👂', '🇮🇱', '🔰', '🏁', '🈲', '🥅', '5️⃣', '⏰', '🐮', '🈁', '🚵', '🍪', '📶', '📀', '😹', '🚸', '🆘', '🐪', '🎶', '🇷🇼', '😣', '🏅', '🍮', '🎽', '🎮', '💠', '🟡', '🔏', '🙏', '💜', '🇲🇦', '🔞', '🍸', '🇩🇪', '🚶', '🇬🇪', '➿', '🐌', '❣️', '🍄', '🇸🇴', '🥏', '🥡', '🩰', '🍍', '🚄', '🤍', '🧮', '🥣', '😑', '🤝', '👏', '🧡', '🙅', '🦄', '🇬🇺', '🇺🇾', '1️⃣', '🇪🇬', '🟩', '🧯', '🤥', '💳', '🇮🇨', '🩳', '🚲', '🧨', '🛬', '🇧🇴', '🧓', '🎐', '🇹🇷', '6️⃣', '🧑', '🇲🇰', '↙️', '🇰🇬', '🇬🇮', '🇮🇸', '🐾', '🇲🇳', '📳', '🇹🇰', '🚺', '📫', '🇸🇲', '🇼🇫', '♦️', '💀', '🦢', '🇧🇾', '🧊', '🧸', '👐', '🇸🇰', '💃', '👪', '㊗️', '🦀', '🛫', '🇨🇷', '🌙', '💒', '😶', '⬆️', '💔', '🕚', '🔩', '👤', '🦧', '🪂', '📡', '🍊', '🇨🇬', '😚', '👗', '🦂', '🟥', '🥵', '🏦', '🎆', '📪', '🇪🇸', '🦐', '™️', '🇳🇪', '🎯', '🎿', '🇳🇷', '🇫🇮', '🔽', '👷', '🇫🇷', '🍻', '🇱🇺', '🧶', '😎', '👵', '↪️', '🇲🇬', '🇬🇾', '🇱🇦', '🗼', '🆗', '🐠', '〰️', '🕧', '🪐', '👀', '🪓', '🐘', '📿', '☹️', '🇯🇲', '🥾', '🌱', '🇧🇫', '⏳', '🦝', '🇲🇨', '💈', '🔙', '🚖', '🇨🇰', '🍖', '🔇', '🉐', '🌹', '🇧🇭', '⤴️', '🍑', '💤', '❓', '📁', '✏️', '🐆', '💱', '🥝', '🥨', '😍', '🌅', '👱', '🏠', '🧔', '🎍', '🤑', '🧺', '🧪', '🥛', '🥯', '📮', '🦔', '💲', '🌛', '🦴', '💮', '🇰🇳', '🦸', '🍓', '👧', '🕞', '🇹🇲', '🍬', '🍙', '⚜️', '🇸🇪', '💾', '🔝', '🇦🇿', '🛴', '💰', '*️⃣', '🆓', '🍈', '🧈', '🍭', '🇦🇽', '🧂', '🙀', '🇨🇭', '🙉', '😗', '🇩🇲', '🇲🇲', '🇻🇨', '🥌', '🌽', '😲', '🙃', '🕍', '💄', '🚒', '🔁', '🐉', '📭', '💣', '🐰', '🕙', '🎸', '😦', '🐩', '🇱🇧', '👳', '🍱', '🍚', '🇬🇳', '👢', '🇨🇻', '🔡', '💌', '⛹️', '🍫', '↕️', '🇦🇹', '🇬🇫', '📓', '🔒', '🥪', '📜', '🔛', '🎭', '☸️', '🇲🇩', '🇧🇦', '🐀', '🇸🇮', '🆕', '🇻🇦', '🌘', '🔴', '🌳', '🙌', '🌝', '📂', '🚷', '🌀', '🐐', '🕑', '🅿️', '🩺', '🔚', '🍗', '🔘', '🔋', '🛀', '🏡', '😓', '👫', '🧜', '🐴', '💙', '🦎', '☝️', '🐍', '📋', '✳️', '🇬🇦', '🐯', '🥟', '🇬🇧', '🚈', '🇳🇬', '🇷🇺', '😳', '🔸', '🇯🇪', '🥖', '🇸🇸', '🇦🇺', '🐃', '🇧🇧', '😯', '🌾', '🚠', '🗽', '🤛', '🦦', '🟣', '☺️', '🚦', '👃', '🍧', '🧣', '🔖', '👥', '👮', '🈹', '◀️', '🇯🇴', '🇾🇹', '😋', '🇸🇭', '🚟', '🚼', '🏧', '😕', '🤿', '🇸🇷', '↔️', '🇲🇸', '⚗️', '👔', '🔱', '🚯', '🧍', '😥', '🥴', '👄', '🧵', '💼', '🈂️', '🎹', '🇿🇼', '🇪🇨', '👾', '🙈', '🎷', '👍', '🔆', '☂️', '🐇', '🌋', '🧫', '🌚', '🚝', '🤟', '🚐', '💍', '😠', '🦯', '💋', '🧄', '🦉', '®️', '💏', '😃', '🐕', '🧗', '🧹', '🔜', '🇳🇿', '🍿', '🇧🇲', '🕥', '🇷🇸', '🚧', '📬', '🎏', '🅰️', '🐅', '📅', '📱', '👑', '🧀', '🐹', '🚕', '♥️', '💭', '🇱🇸', '💓', '🕛', '🕟', '🧃', '🦇', '💡', '🇳🇺', '🔠', '🇲🇶', '⚛️', '🍎', '🏨', '🚍', '👚', '🎡', '📗', '🧧', '⏫', '💨', '🍒', '🥂', '👰', '👋', '😜', '🇻🇪', '😺', '📣', '🎰', '🧰', '✂️', '🇹🇯', '🌟', '📰', '😵', '🌴', '📛', '👟', '🧤', '🍌', '🦋', '🕗', '🐢', '🥧', '🎎', '🍺', '💚', '🔵', '🎻', '🇧🇪', '🍂', '🏴', '🇮🇷', '🇬🇷', '🇹🇭', '#️⃣', '📎', '🌜', '🦍', '📢', '🍘', '🇨🇿', '🇸🇾', '🥬', '🏐', '⚖️', '🥀', '🌷', '🔫', '🐶', '🇰🇾', '😰', '🛌', '🎴', '👶', '🇻🇳', '📺', '🇲🇱', '🇭🇹', '🔌', '🌁', '🎤', '🤙', '🇫🇰', '🎃', '🥐', '🦖', '🌲', '🇬🇬', '🍁', '🌕', '🐛', '👺', '😌', '🇰🇼', '👅', '🧴', '📲', '🍼', '🔄', '🐋', '🍉', '🇬🇶', '📼', '☄️', '🥘', '💫', '🍐', '🤓', '🇪🇺', '⬇️', '🚥', '🇧🇸', '🆖', '🔀', '🇬🇵', '🚱', '📘', '🎓', '🇵🇫', '🏉', '🥍', '🤽', '🤩', '🚔', '🐺', '🌞', '🚁', '🌇', '🇸🇦', '🎣', '📹', '🔪', '🚩', '😖', '💹', '💆', '🥦', '👒', '🇭🇳', '🥮', '😬', '😡', '🤡', '🧒', '🪒', '💉', '😧', '🚫', '🤷', '💖', '🔧', '🚻', '🚗', '🤐', '👻', '🙁', '📧', '☣️', '📒', '😩', '⏏️', '😘', '🕜', '🌑', '🇹🇴', '🦊', '🟫', '☀️', '🐧', '🤫', '🤰', '🇵🇬', '🚊', '🏭', '🟨', '🥢', '😄', '🇬🇲', '🥞', '☁️', '🥄', '🇷🇴', '🇱🇨', '2️⃣', '🔉', '🇹🇳', '📩', '⁉️', '🦟', '🇨🇩', '😱', '🐒', '📤', '🏳️', '📴', '✒️', '🇿🇲', '📸', '🔥', '🇲🇺', '🇲🇭', '🔂', '🅾️', '🐲', '🌺', '🌻', '🩲', '🏬', '🇷🇪', '🚙', '🎀', '🇳🇦', '🙍', '🤮', '🤨', '🔕', '🙄', '‼️', '🇲🇷', '🐨', '🥽', '🐚', '🎺', '🔈', '🎈', '🇨🇲', '💸', '🇹🇫', '📌', '🧾', '🦾', '🤸', '👈', '😝', '🇹🇻', '🤦', '🤪', '🥑', '😨', '🙂', '👇', '🦩', '🐂', '↩️', '😮', '🍹', '🇲🇹', '😆', '🚨', '🇵🇦', '🤱', '📙', '🐵', '🐈', '🛷', '🇴🇲', '📵', '♨️', '🕖', '🦶', '🥔', '🥓', '🍨', '◻️', '👸', '📕', '🔗', '▪️', '🇵🇲', '🈷️', '🇸🇩', '🇹🇨', '🦙', '🐽', '🇬🇹', '🇫🇯', '🇲🇴', '🌌', '🟪', '💪', '🚇', '🤯', '🛹', '🗾', '✅', '🖕', '🥊', '🔯', '🎢', '🇮🇳', '🎒', '🛕', '☢️', '✊', '🇦🇫', '☠️', '🇪🇭', '💦', '🥼', '🏊', '3️⃣', '🤬', '🥇', '😭', '🏈', '🚮', '🏣', '😙', '➗', '📔', '🎦', '🚽', '💞', 'Ⓜ️', '🕎', '©️', '🎂', '🚭', '🍣', '🦵', '✈️', '🐟', '📚', '🔼', '😉', '🏩', '✝️', '📉', '👬', '🍝', '🙆', '↘️', '🚛', '🥶', '💿', '🚃', '🐝', '🇲🇼', '🆑', '🍜', '🕝', '✨', '⤵️', '🇬🇱', '✉️', '🍴', '⚱️', '🐔', '🥱', '🔊', '🛂', '🦗', '🩱', '🧁', '💇', '🐸', '🟤', '🤞', '🇦🇼', '🇨🇴', '🇰🇷', '🍾', '🛶', '🛃', '🚚', '🚪', '🏂', '🇨🇱', '🧠', '🇮🇩', '🇾🇪', '😇', '😏', '🇬🇩', '🎊', '🇨🇫', '😴', '🌮', '↗️', '🧎', '🇨🇽', '🇸🇨', '🥕', '➕', '🐡', '🧳', '🐻', '🇮🇲', '🐙', '🆎', '🎋', '👠', '🚘', '🥺', '🌓', '🇮🇪', '🕡', '🎳', '❕', '📍', '🌯', '🐣', '💥', '🐑', '📝', '🉑', '🌿', '📨', '🏀', '🔹', '🏇', '🇧🇼', '🍤', '🇵🇳', '🧟', '💝', '🌵', '🙇', '⏪', '🥰', '🧚', '🦒', '🍇', '🎇', '🟦', '🔶', '🥠', '🤗', '🤧', '▫️', '🇸🇬', '🍦', '📻', '😈', '🆚', '🤾', '👡', '🚞', '💎', '🖖', '🐷', '😫', '🦅', '🎪', '🔣', '🇨🇮', '👭', '🍅', '💁', '😼', '🚹', '🦏', '🤴', '📥', '🔢', '🍃', '💛', '😷', '🕔', '🇰🇿', '🏸', '🇲🇪', '🇦🇶', '🕓', '📈', '🛅', '🎬', '🍞', '🎨', '🈳', '🇮🇹', '🚓', '🧞', '🕋', '💗', '👹', '🚌', '🚑', '🤜', '🍆', '👼', '☑️', '🩸', '🤼', '⌨️', '↖️', '❄️', '🔦', '🇦🇸', '🥜', '🎧', '🕺', '🌒', '📄', '🇫🇲', '🇱🇹', '🏋️', '🎩', '😟', '㊙️', '🇧🇩', '➖', '🎉', '🦞', '🦷', '🦚', '😒', '☃️', '⚙️', '🇹🇱', '🛸', '🎱', '🎌', '🤔', '👉', '🎑', '💂', '🎥', '🕢', '💯', '🇲🇻', '🍋', '🔔', '🥁', '🔍', '🥫', '🌖', '🇹🇼', '🌍', '📐', '🦁', '😔', '🌸', '🐥', '🤵', '🍔', '8️⃣', '🇳🇱', '🆔', '🇻🇺', '🛄', '🧩', '📖', '🇹🇹', '🦆', '🇧🇯', '♻️', '🇱🇷', '🈶', '🔳', '👩', '🛵', '🐗', '😤', '🔅', '✋', '🌐', '🤶', '👿', '4️⃣', '👦', '🔬', '🕕', '🇭🇰', '🇭🇺', '🤠', '🥳', '🇯🇵', '🇲🇿', '🧲', '🧦', '✴️', '🥗', '🈵', '🐖', '🌔', '⬅️', '🈴', '🔤', '🇺🇸', '🇲🇽', '🌎', '😊', '👨', '🌊', '🧱', '🇱🇾', '⚠️', '🕒', '🇲🇵', '🧢', '👙', '🇩🇯', '🇱🇮', '🥤', '☎️', '👌', '🍟', '🧆', '🦕', '🕤', '🐤', '🏄', '🕐', '🇵🇹', '☯️', '🔺', '🦿', '🇦🇩', '🚅', '🎼', '🔃', '🇽🇰', '🛐', '🏺', '🇦🇷', '🐄', '🥋', '🥻', '🇧🇷', '👽', '🏢', '🌉', '🏓', '⏬', '🇲🇾', '☪️', '🇨🇺', '😁', '😽', '😞', '💢', '🇺🇦', '🍢', '🇵🇭', '🏆', '🚉', '🐊', '🛒', '🏰', '🧭', '🌭', '⚰️', '🇧🇬', '🇿🇦', '🦮', '🟠', '🧙', '🇶🇦', '🇹🇿', '🦛', '🇳🇫', '💕', '🧖', '🪁', '🏪', '🔨', '🔭', '🪑', '🇺🇳', '🇨🇼', '🩹', '🦡', '📦', '🚆', '🇦🇬', '🇧🇱', '🇰🇮', '💑', '🎾', '😀', '❇️', '🤢', '🧐', '🧅', '🪔', '🏫', '🏮', '🚏', '😪', '🐫', '☦️', '✖️', '🐞', '🇰🇪', '🦈', '🔎', '🇹🇩', '🕦', '🇸🇿', '🥙', '🌂', '🐼', '🇭🇷', '🤖', '🧬', '🇩🇴', '🇦🇱', '📏', '🎠', '🥎', '🇧🇳', '🈸', '🤭', '❤️', '🦻', '😐', '🚡', '🧷', '🍀', '🇳🇮', '🦌', '💟', '🏹', '🥉', '👞', '🥭', '💅', '🕣', '📷', '🇫🇴', '💘', '🐭', '🦹', '🍰', '🇳🇵', '🇧🇮', '➰', '💺', '🐱', '🏏', '🇰🇭', '🧛', '👆', '🥈', '🦃', '7️⃣', '〽️', '👘', '🇵🇰', '🤺', '🇹🇬', '🇦🇮', '🔮', '🇪🇷', '📟', '🏌️', '🇺🇬', '🇧🇿', '🇧🇶', '🏑', '👜', '🛁', '☮️', '🍯', '💶', '🔑', '🥚', '➡️', '🏥', '🪀', '❌', '🍵', '🦥', '🍳', '🇦🇪', '🥥', '📊', '⏩', '🚎', '👯', '🇵🇱', '🇱🇰', '🕘', '🇮🇶', '🌗', '🧻', '🕠', '0️⃣', '🇩🇰', '🤹', '👴', '🍲', '🕌', '📞', '🦺', '📆', '💻', '🇦🇲', '👓', '🚢', '🧼', '🇸🇳', '🐳', '🚳', '🇨🇾', '📯', '📃', '🦓', '🇸🇧', '🦽', '🐓', '🍏', '🏒', '🦠', '🗿', '⚔️', '🍥', '🅱️', '🧕', '🎫', '🎄', '😢', '9️⃣', '🍕', '🇵🇸', '🇧🇹', '🐏', '🚿', '🥩', '🌄', '🐬', '👣', '🇬🇭', '💐', '🇺🇿', '🌠', '⛎', '🇳🇴', '🤕', '🤘', '✌️', '🥿', '😂', '🐁', '🦼', '🤎', '🇩🇿', '🈺', '🦘', '🥃', '🍡', '🗻', '🪕', '🤒', '🤤', '💬', '🐎', '🚣', '💊', '🧇', '🇬🇸', '▶️', '📇', '📠', '🆒', '🔲', '🇰🇲', '🇵🇪', '✔️', '🇨🇳', '🧘', '🐦', '🆙', '🇮🇴', '🌈', '🎵']
    }
  },
  components: {
  },
  mounted () {

  },
  methods: {
    copyEmojiCode () {
      navigator.clipboard.writeText(this.toEmoji)
      console.log('Emoji Copied')
      this.snackbar_text = 'Emoji Copied to Clipboard!'
      this.snackbar = true
    },
    copyTextCode () {
      navigator.clipboard.writeText(this.toText)
      console.log('Text Copied')
      this.snackbar_text = 'Text Copied to Clipboard!'
      this.snackbar = true
    },
    emojiSelf () {
      this.inEmoji = '😻🏯🥙🛐✉️🐲'
      this.snackbar_text = 'Secret Corner Emoji!'
      this.snackbar = true
    }
  },
  computed: {
    toEmoji: function () {
      if (!this.inText) {
        return ''
      }
      const textLen = this.ascii_list.length
      const emojiList = this.emoji_list
      const emojiLen = emojiList.length
      const textList = this.ascii_list

      function recurEmoji (dec) {
        const oper = dec.divmod(bigInt(emojiLen))
        const x = oper.remainder
        const rest = oper.quotient
        if (Number(rest) === 0) {
          return emojiList[Number(x)]
        }
        return recurEmoji(rest) + emojiList[Number(x)]
      }

      let total = bigInt(0)
      for (let i = 0; i < this.inText.length; i++) {
        total = total.add((bigInt(textLen).pow(i)).times(bigInt(textList.indexOf(this.inText[i].toString()))))
      }
      const result = recurEmoji(total)
      return result
    },
    toText: function () {
      if (!this.inEmoji) {
        return ''
      }
      const emojiList = this.emoji_list
      const emojiLen = emojiList.length
      const textList = this.ascii_list
      const textLen = textList.length

      function recurText (dec) {
        const oper = dec.divmod(bigInt(textLen))
        const x = oper.remainder
        const rest = oper.quotient
        // eslint-disable-next-line eqeqeq
        if (Number(rest) == 0) {
          return textList[Number(x)].toString()
        }
        return recurText(rest) + textList[Number(x)].toString()
      }

      let total = bigInt(0)
      const regex = emojiRegex()
      const emojiListStr = emojiList.join('')

      console.log(this.inEmoji.match(regex))

      const regexTry = this.inEmoji.match(regex)
      if (!regexTry) {
        return ''
      }
      const regexMatch = regexTry.reverse()

      for (let i = 0; i < regexMatch.length; i++) {
        total = total.add((bigInt(emojiLen).pow(i)).times(indexOf(emojiListStr, regexMatch[i])))
      }

      const result = recurText(bigInt(total))
      return result.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>
div.v-snack:not(.v-snack--absolute) {
    height: 100%;
}
</style>
