window.onload =
    function () {
        Keyboard.locStorage()
        Keyboard.init()
    }

const Keyboard = {
    elements: {
        textarea: null,
        keyboard: null,
        keyboardKeys: null,
        keys: [],
        comment: null,
    },

    properties: {
        capsLock: false,
        language: true
    },

    init() {
        //create textarea

        this.elements.textarea = document.createElement('textarea');
        this.elements.textarea.classList = 'textarea';
        this.elements.textarea.setAttribute('autofocus', true);
        document.body.appendChild(this.elements.textarea);


        //create keyboard
        this.elements.keyboard = document.createElement('div');
        this.elements.keyboardKeys = document.createElement('div');
        this.elements.keyboard.classList = 'keyboard';
        this.elements.keyboardKeys.classList = 'keyboard__keys';
        this.elements.keyboard.appendChild(this.elements.keyboardKeys);
        document.body.appendChild(this.elements.keyboard);
        this.elements.keys = this.elements.keyboardKeys.querySelectorAll('.key');
        this.elements.keyboardKeys.appendChild(this.createKeys());

        //add handlers
        
        this.addData();
        this.pressKey();
        this.pressCaps();

        //create comments
        this.elements.comment = document.createElement('div');
        this.elements.comment.classList = 'comment';
        document.body.appendChild(this.elements.comment);
        this.elements.comment.innerHTML = `<p>Клавиатура создана в OC Windows
  '<i class="fab fa-windows"></i>'</p>
                       <p>Для переключения языка комбинация: левыe ctrl + alt</p>`

    },

    createKeys() {
        const textarea = this.elements.textarea;
        const fragment = document.createElement('div');
        fragment.classList.add('fragment');
        const keyEng = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '"', 'enter',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '[',
            ']', 'shift-l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.',
            'arrow-up', 'shift-r', 'ctrl-l', 'wind', 'alt-l', 'space', 'alt-r', 'arrow-l', 'arrow-down', 'arrow-r', 'ctrl-r'
        ];

        const keyRu = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
            'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', '"', 'enter',
            'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
            '/', 'shift-l', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
            'arrow-up', 'shift-r', 'ctrl-l', 'wind', 'alt-l', 'space', 'alt-r', 'arrow-l', 'arrow-down', 'arrow-r', 'ctrl-r'
        ];

        localStorage.setItem('lang', this.properties.language);
        lang = localStorage.getItem('lang');
        let keys;
        keys = lang == 'true' ? keyEng : keys = keyRu;


        keys.forEach(key => {
            const keyButton = document.createElement('button');
            const lineBreak = ['backspace', 'enter', ']', 'shift-r'].indexOf(key) !== -1;
            keyButton.setAttribute('type', 'button');
            keyButton.classList.add('key');


            switch (key) {
                case 'backspace':
                    keyButton.classList.add('key--wide');
                    keyButton.innerHTML = '<i class="fas fa-backspace"></i>';
                    keyButton.addEventListener('click', function () {
                        let length = textarea.value.length;
                        textarea.value = textarea.value.substring(0, length - 1);
                    })
                    break;

                case 'tab':
                    keyButton.innerHTML = '<i class="fas fa-exchange-alt"></i>';
                    keyButton.setAttribute('data', 'Tab');
                    break;

                case 'enter':
                    keyButton.classList.add('key--wide');
                    keyButton.innerHTML = '<i class="fas fa-external-link-alt"></i>';
                    keyButton.addEventListener('click', function (e) {
                        textarea.value += '\n';
                        textarea.focus();
                    })
                    break;

                case 'caps':
                    keyButton.classList.add('key--wide');
                    keyButton.classList.add('CapsLock');
                    keyButton.innerHTML = '<i class="fas fa-caret-square-up"></i>';
                    keyButton.addEventListener('click', (e) => {
                        e.target.classList.toggle('key-active');
                        this.toggleCapsLock();
                    })
                    break;

                case 'shift-l':
                    keyButton.classList.add('key--wide');
                    keyButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

                    break;

                case 'shift-r':
                    keyButton.classList.add('key--wide-2');
                    keyButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
                    break;

                case 'wind':
                    keyButton.innerHTML = '<i class="fab fa-windows"></i>';

                    break;

                case 'space':
                    keyButton.classList.add('key--wide-extra');
                    keyButton.textContent = '___';
                    keyButton.addEventListener('click', function () {
                        textarea.value += ' ';

                    })

                    break;

                case 'ctrl-l':
                    keyButton.innerHTML = `<span>${key.substring(0, 4).toLowerCase()}<span>`;
                    keyButton.classList.add('ctrl');
                    keyButton.addEventListener('click', function () {
                        console.log('ctrl on')
                        textarea.focus();
                    })
                    break;

                case 'ctrl-r':
                    keyButton.innerHTML = `<span>${key.substring(0, 4).toLowerCase()}<span>`;
                    keyButton.addEventListener('click', function (e) {
                        textarea.focus();
                        console.log('ctrl on')
                    })
                    break;

                case 'alt-l':
                    keyButton.innerHTML = `<span>${key.substring(0, 3).toLowerCase()}<span>`;
                    keyButton.classList.add('alt');
                    keyButton.addEventListener('click', function () {
                        textarea.focus();
                    })
                    break;

                case 'alt-r':
                    keyButton.innerHTML = `<span>${key.substring(0, 3).toLowerCase()}<span>`;

                    keyButton.addEventListener('click', function () {
                        textarea.focus();
                    })
                    break;

                case 'arrow-up':
                    keyButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
                    keyButton.addEventListener('click', function () {
                        textarea.setSelectionRange(0, 0);
                        textarea.focus();
                    })
                    break;

                case 'arrow-l':
                    keyButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    keyButton.addEventListener('click', function () {
                        let end = textarea.value.length;
                        for (let i = 0; i < end; i++)
                            textarea.setSelectionRange(0, 0);
                        textarea.focus();
                    })
                    break;

                case 'arrow-r':
                    keyButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    keyButton.addEventListener('click', function () {
                        let end = textarea.value.length;
                        textarea.setSelectionRange(end, end);
                        textarea.focus();
                    })
                    break;

                case 'arrow-down':
                    keyButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    keyButton.addEventListener('click', function () {
                        let end = textarea.value.length;
                        textarea.setSelectionRange(end, end);
                        textarea.focus();
                    })
                    break;

                default:
                    keyButton.textContent = key.toLowerCase();
                    keyButton.addEventListener('click', function () {
                        textarea.value += this.textContent;
                    })
                    break;
            }

            fragment.appendChild(keyButton);
            if (lineBreak) {
                fragment.appendChild(document.createElement('br'));
            }

        });
        return fragment;
    },


    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        const keys = document.querySelectorAll('.key');
        for (const key of keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    toggleLang() {
        const lang = localStorage.getItem('lang');
        localStorage.setItem('lang', lang === 'true' ? 'false' : 'true');
        document.location.reload(true);
    },

    addData() {
        const dataCode = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
            'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'Quote',
            'Enter', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'BracketLeft',
            'BracketRight', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period',
            'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
        ];
        const keys = document.querySelectorAll('.key');
        for (let i = 0; i < keys.length; i++) {
            for (let j = 0; j < dataCode.length; j++) {
                keys[i].setAttribute('data', `${dataCode[i]}`);
                i++;
            }
        }
    },


    pressKey() {

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        this.changeLangByKeys();
        const keys = document.querySelectorAll('.key');
        const textarea = this.elements.textarea;
        const signts = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        function keyDown(e) {

            for (const key of keys) {
                if (e.code === key.getAttribute('data')) {
                    key.classList.add('key-press');
                    if (key.textContent.length === 1 || key.getAttribute('data') == 'Tab') {
                        e.preventDefault();
                    }
                }
                if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
                    let i = 0;
                    for (const key of keys) {
                        if (key.childElementCount === 0) {
                            key.textContent = key.textContent.toUpperCase();
                        }
                        if (key.getAttribute('data').substring(0, 5) == 'Digit') {
                            keys[i].textContent = signts[i];
                            i++;
                        }
                    }
                }
            }
        }

        function keyUp(e) {

            for (const key of keys) {
                if (e.code === key.getAttribute('data')) {
                    e.preventDefault();
                    key.classList.remove('key-press');
                    if (key.textContent.length === 1) {
                        e.preventDefault();
                        textarea.value += key.textContent;
                    }

                }


                if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
                    let i = 0;
                    for (const key of keys) {
                        if (key.childElementCount === 0) {
                            key.textContent = key.textContent.toLowerCase();
                        }

                        if (key.getAttribute('data').substring(0, 5) == 'Digit') {
                            keys[i].textContent = numbers[i];
                            i++;
                        }
                    }
                }
            }
        }
    },

    pressCaps() {
        document.addEventListener('keyup', (e) => {
            if (e.code == 'CapsLock') {
                document.querySelector('.CapsLock').classList.toggle('key-active');
                this.toggleCapsLock();
            }
        });
    },

    changeLangByKeys() {
        const alt = document.querySelector('.alt');
        const ctrl = document.querySelector('.ctrl');

        document.addEventListener('keydown', () => {
            if (alt.classList.contains('key-press') && ctrl.classList.contains('key-press')) {
                this.toggleLang();
            }
        })
    },

    locStorage() {
        this.properties.language = (localStorage.getItem('lang')) ? localStorage.getItem('lang') : true;
    }
}
