
window.onload =  
    function() {
   Keyboard.init()
   Keyboard.pressKey()
   Keyboard.pressCaps()
    }

const Keyboard = {
    elements: {
        textarea: null,
        keyboard: null,
        keyboardKeys: null,
        keys: []
    },

    properties: {
    //  value: '',
     capsLock: false,
     langRu: false
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
      this.elements.keyboardKeys.appendChild(this.createKeys());
      this.elements.keyboard.appendChild(this.elements.keyboardKeys);
      document.body.appendChild(this.elements.keyboard);
      this.elements.keys = this.elements.keyboardKeys.querySelectorAll('.key');
    },
    
    createKeys() {
    const textarea = this.elements.textarea;
    const fragment = document.createDocumentFragment();
    const keys = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab','q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '"', 'enter',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '[', 
        ']','shift-l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.',
        '/', 'shift-r', 'ctrl-l', 'wind', 'alt-l', 'space', 'alt-r', '~', 'ctrl-r'
    ]

    const keysRU = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab','й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', '"', 'enter',
        'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 
        '|','shift-l', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
        '/', 'shift-r', 'ctrl-l', 'wind', 'alt-l', 'space', 'alt-r', '~', 'ctrl-r'
    ]
   
      keys.forEach(key => {
      const keyButton= document.createElement('button');
      const lineBreak = ['backspace', 'enter', ']', 'shift-r'].indexOf(key) !== -1;
      keyButton.setAttribute('type', 'button');
      keyButton.classList.add('key');
      

      switch (key) {
        case 'backspace':
            keyButton.classList.add('key--wide');
            keyButton.innerHTML = '<i class="fas fa-backspace"></i>';
            keyButton.setAttribute ('data', 'Backspace');
            keyButton.addEventListener ('click', function () {
               let length = textarea.value.length;
               textarea.value = textarea.value.substring(0, length-1);
                               })

        break;

        case 'tab':
            keyButton.innerHTML = '<i class="fas fa-exchange-alt"></i>';
            keyButton.setAttribute ('data', 'Tab');
        break;

        case 'enter':
            keyButton.classList.add('key--wide');
            keyButton.setAttribute ('data','Enter');
            keyButton.innerHTML = '<i class="fas fa-external-link-alt"></i>';
            keyButton.addEventListener ('click', function (e) {
                textarea.value += '\n';
                textarea.focus();
                })
        break;

        case 'caps':
            keyButton.classList.add('key--wide');
            keyButton.classList.add('CapsLock');
            keyButton.innerHTML = '<i class="fas fa-caret-square-up"></i>';
            keyButton.addEventListener ('click',  (e) => {
               e.target.classList.toggle ('key-active');
               this.toggleCapsLock();

            })
        break; 

        case 'shift-l':
            keyButton.classList.add('key--wide');
            keyButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            keyButton.setAttribute ('data', 'ShiftLeft');
                       
        
        break;

        case 'shift-r':
            keyButton.classList.add('key--wide-2');
            keyButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            keyButton.setAttribute ('data', 'ShiftRight');
        break;
        
        case 'wind':
            keyButton.innerHTML = '<i class="fab fa-windows"></i>';
            keyButton.setAttribute ('data', 'MetaLeft');
        break;

        case 'space':
            keyButton.classList.add('key--wide-extra');
            keyButton.textContent = '___';
            keyButton.setAttribute ('data', 'Space');
            keyButton.addEventListener ('click', function () {
                textarea.value += ' ';

                })
     
        break;

        case 'ctrl-l':
            keyButton.innerHTML = `<span>${key.substring(0,4).toLowerCase()}<span>`;
            keyButton.setAttribute ('data','ControlLeft');
            keyButton.addEventListener ('click', function () {
               console.log ('ctrl on')
               textarea.focus();
                })
        break; 
        
        case 'ctrl-r':
            keyButton.innerHTML = `<span>${key.substring(0,4).toLowerCase()}<span>`;
            keyButton.setAttribute ('data', 'ControlRight');
            keyButton.addEventListener ('click', function (e) {
                textarea.focus();
               console.log ('ctrl on')
                })
        break; 

        case 'alt-l':
            keyButton.innerHTML = `<span>${key.substring(0,3).toLowerCase()}<span>`;
            keyButton.setAttribute ('data','AltLeft');
            keyButton.addEventListener ('click', function () {
                textarea.focus();
               console.log ('alt on')
                })
        break;  
       
        case 'alt-r':
            keyButton.innerHTML = `<span>${key.substring(0,3).toLowerCase()}<span>`;
            keyButton.setAttribute ('data', 'AltRight');
            keyButton.addEventListener ('click', function () {
               console.log ('alt on');
               textarea.focus();
                })
        break; 
       
      default:
        keyButton.textContent = key.toLowerCase()     
        keyButton.addEventListener ('click', function () {
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

    triggerEvents(handlerName) {

    },

    toggleCapsLock(){
    this.properties.capsLock = !this.properties.capsLock;
    
    for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock? key.textContent.toUpperCase() : key.textContent.toLowerCase(); 
    }
}

    },

    toggleLang(){

    },

    pressKey(){
    
        document.addEventListener ('keydown', animateOn);
        document.addEventListener ('keyup', animateOff);
     
       
        
    const keys = this.elements.keyboardKeys.querySelectorAll('.key');
    function animateOn (e) {
        for (const key of keys)  {
            // console.log(e.key)
            if (e.key == key.textContent) {
                key.classList.add('key-press'); }
            if (key.getAttribute('data') === e.code) {
                {key.classList.add('key-press')};
            }
       
            }
    }

    function animateOff (e) {
        for (const key of keys)  {
            if (e.key == key.textContent) {
            key.classList.remove('key-press'); }
            if (key.getAttribute('data') === e.code) {
                {key.classList.remove('key-press');
               e.preventDefault();   };
            }
            
            
           }
    }

},
pressCaps(){
document.addEventListener ('keyup', (e) => {
    if(e.code =='CapsLock') {
        console.log ('ddd');
       document.querySelector('.CapsLock').classList.toggle ('key-active');
        this.toggleCapsLock();
        }
});
}



}




    // let cursorPosition = INPUT.selectionStart;
    // const cursorPositionEnd = INPUT.selectionEnd;