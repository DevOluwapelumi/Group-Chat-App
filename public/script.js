// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAn4I0D7w0VgVwy1p7vtu_YY8AuNzf5Fcc",
  authDomain: "chatbox-b4169.firebaseapp.com",
  databaseURL: "https://chatbox-b4169-default-rtdb.firebaseio.com",
  projectId: "chatbox-b4169",
  storageBucket: "chatbox-b4169.appspot.com",
  messagingSenderId: "1002294702185",
  appId: "1:1002294702185:web:0cbf6c863cb8eb6508b2f8"
};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const auth = getAuth()
	const db = getDatabase();

onAuthStateChanged(auth, (user) => {
	const userNameEl = document.getElementById('user')
	const userImage = document.getElementById('userImg')
	if(user) {
		console.log(user)
		userNameEl.innerHTML = user.displayName
		userImage.src = user.photoURL
	}else {
		window.location.href = 'index.html'
	}
})

signOutBtn.addEventListener('click', () => {
	console.log('done')
	signOut(auth)
	.then(() => {
		window.location.href = 'index.html'
	})
})


// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const sendBtn = document.querySelector('.chatbox-message-submit')




// textarea.addEventListener('input', function () {
// 	let line = textarea.value.split('\n').length

// 	if(textarea.rows < 6 || line < 6) {
// 		textarea.rows = line
// 	}

// 	if(textarea.rows > 1) {
// 		chatboxForm.style.alignItems = 'flex-end'
// 	} else {
// 		chatboxForm.style.alignItems = 'center'
// 	}
// })


// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show')
})
document.addEventListener('click', function (e) {
	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show')
	}
})


// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')
let chatArray = []
let chatIndex = 0

sendBtn.addEventListener('click', (e) => {
		e.preventDefault()
		const today = new Date()
		const user = auth.currentUser;
		
		let chatProp = {
			usermail: user.email,
			fullname: user.displayName,
			messages: textarea.value,
			time: `${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}`
		}

		let dbRef = ref(db,`chats/${chatIndex}`)
		set(dbRef,chatProp)

		textarea.value = ''
})


onValue(ref(db,'chats'),(snapshot) => {
			const user = auth.currentUser;
			chatArray = snapshot.val()
			chatboxMessageWrapper.innerHTML = ''
			if(chatArray) {
				chatIndex = chatArray.length
				chatArray.map((eachChat) => {
          chatboxMessageWrapper.innerHTML += `
          <div class="chatbox-message-item sent">
          <p id="user">${eachChat.fullname}</p>
            <span class="chatbox-message-item-text">
            ${eachChat.messages}
            </span>
            <span class="chatbox-message-item-time">${eachChat.time}</span>
          </div>
          `
          // chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
          scrollBottom()
					const chatEl = document.querySelectorAll('.chatbox-message-item')
					chatEl.forEach((eachChatEl) => {
						if(eachChatEl.children[0].textContent !== user.displayName){
							eachChatEl.classList.replace('sent','received')
						}
					})
        })
			} else {
				chatIndex = 0
			}
})


function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function addZero(num) {
	return num < 10 ? '0'+num : num
}











// chatboxToggle.addEventListener('click', function () {
// 	chatboxMessage.classList.toggle('show')
// })


// document.addEventListener('click', function (e) {
// 	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
// 		dropdownMenu.classList.remove('show')
// 	}
// })

// // CHATBOX MESSAGE
// const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
// const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

// chatboxForm.addEventListener('submit', function (e) {
// 	e.preventDefault()

// 	if(isValid(textarea.value)) {
// 		writeMessage()
// 		setTimeout(autoReply, 1000)
// 	}
// })



// function addZero(num) {
// 	return num < 10 ? '0'+num : num
// }

// function writeMessage() {
// 	const today = new Date()
// 	let message = `
// 		<div class="chatbox-message-item sent">
// 			<span class="chatbox-message-item-text">
// 				${textarea.value.trim().replace(/\n/g, '<br>\n')}
// 			</span>
// 			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}</span>
// 		</div>
// 	`
// 	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
// 	chatboxForm.style.alignItems = 'center'
// 	textarea.rows = 1
// 	textarea.focus()
// 	textarea.value = ''
// 	chatboxNoMessage.style.display = 'none'
// 	scrollBottom()
// }

// function autoReply() {
// 	const today = new Date()
// 	let message = `
// 		<div class="chatbox-message-item received">
// 			<span class="chatbox-message-item-text">
// 				Thank you for your awesome support!
// 			</span>
// 			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}</span>
// 		</div>
// 	`
// 	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
// 	scrollBottom()
// }

// function scrollBottom() {
// 	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
// }

// function isValid(value) {
// 	let text = value.replace(/\n/g, '')
// 	text = text.replace(/\s/g, '')

// 	return text.length > 0
// }
