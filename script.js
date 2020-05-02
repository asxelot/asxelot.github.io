const app = new Vue({
  el: '#app',
  data: {
    state: 'game',
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: null,
    selectedCards: [],
    buttons: [
      [
        { name: 'one green card', value: 1 },
        { name: 'two green card', value: 2 },
        { name: 'three green card', value: 3 },
        { name: 'skip-blue card', value: 20 }
      ],
      [
        { name: 'four green card', value: 4 },
        { name: 'five green card', value: 5 },
        { name: 'six green card', value: 6 },
        { name: 'reverse-blue card', value: 20 }
      ],
      [
        { name: 'seven green card', value: 7 },
        { name: 'eight green card', value: 8 },
        { name: 'nine green card', value: 9 },
        { name: 'draw-two-blue card', value: 20 }
      ],
      [
        { name: 'zero green card', value: 0 },
        { name: 'wild card', value: 50 },
        { name: 'wild-draw-four card', value: 50 },
        { name: 'unknown card' }
      ]
    ]
  },
  watch: {
    users: {
      handler(value) {
        localStorage.setItem('users', JSON.stringify(value))
      },
      deep: true
    }
  },
  methods: {
    addUser() {
      console.log('add user')
      const name = window.prompt('Name:')
      if (name) this.users.push({ name, score: 0 })
    },
    reset() {
      if (window.confirm('are you sure?')) {
       this.users = []
      }
    },
    showUser(user) {
      this.selectedCards = []
      this.currentUser = user
      this.state = 'score'
      console.log('user', user)
    },
    add(card) {
      if (card.value === undefined) return this.state = 'game'
      this.selectedCards.push(card)
      this.currentUser.score += card.value
    },
    remove(index) {
      const card = this.selectedCards[index]
      this.selectedCards.splice(index, 1)
      this.currentUser.score -= card.value
    },
    str2obj(str) {
      const obj = {}
      str.split(' ').forEach(k => obj[k] = true)
    }
  }
})

function render(state) {
  Array.from(document.querySelectorAll('[data-bind]')).forEach(el => {
    const path = el.getAttribute('data-bind')
    el.innerText = state[path]
  })
}

Array.from(document.querySelectorAll('.buttons .card')).forEach(el => {
  el.addEventListener('click', onButtonClick)
})

function onButtonClick() {
  const el = document.createElement('span')
  el.classList = this.classList
  el.setAttribute('data-score', this.getAttribute('data-score'))
  el.addEventListener('click', onRemove)
  cards.appendChild(el)
  score.innerText = +score.innerText + +this.getAttribute('data-score')
}

function onRemove() {
  score.innerText = +score.innerText - +this.getAttribute('data-score')
  this.remove()
}