const AV = require('/../libs/av-weapp-min.js')
const UI = require('../utils/ui.js')

var api = {
  bookResHandle(res) {
    var books = []
    res.forEach((v) => {
      var obj = {
        objectId: v.id,
        data: v.attributes
      }
      books.push(obj)
    })
    return books
  },

  getUserInfo(userID) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Team')
      query.get(userID)
        .then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  checkIn(name, phone) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      new AV.Query('Team')
        .equalTo('username', name)
        .find()
        .then((team) => {
          if (team.length == 0) {
            var Team = AV.Object.extend('Team')
            var team = new Team()
            team.set('username', name)
            team.set('phone', phone)
          } else {
            team = team[0]
            team.set('username', name)
            team.set('phone', phone)
          }
          return team.save()
        })
        .then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },
  addBook(book) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var Books = AV.Object.extend('Books')
      var Book = new Books()
      Book.set('isbn', book.isbn)
      Book.set('info', book.info)
      Book.set('tag', book.tag)
      Book.set('title', book.title)
      Book.save()
        .then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch(() => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },
  getBookInfo(isbn) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      wx.request({
        url: 'https://api.douban.com/v2/book/isbn/' + isbn,
        header: {
          "Content-Type": "json"
        },
        success(res) {
          UI.hideLoading()
          resolve(res.data)
        },
        fail(err) {
          UI.hideLoading()
          UI.error()
          reject(err)
        }
      })
    })
  },

  getDefaultBooks() {
    return new Promise((resolve, reject) => {
      UI.showNavLoading()
      var query = new AV.Query('Books')
      query.find()
        .then((res) => {
          UI.hideNavLoading()
          resolve(this.bookResHandle(res))
        })
        .catch((err) => {
          UI.hideNavLoading()
          UI.error()
          reject(err)
        })
    })
  },

  searchBooksByTag(tag) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Books')
      query.equalTo('tag', tag).find()
        .then((res) => {
          UI.hideLoading()
          resolve(this.bookResHandle(res))
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  searchBooksByName(title) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Books')
      query.contains('title', title).find()
        .then((res) => {
          UI.hideLoading()
          resolve(this.bookResHandle(res))
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  searchBooksByISBN(isbn) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Books')
      query.contains('isbn', isbn).find()
        .then((res) => {
          UI.hideLoading()
          resolve(this.bookResHandle(res))
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  searchBookById(bookID) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Books')
      query.get(bookID).then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  borrow(name, userID, bookID) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var book = AV.Object.createWithoutData('Books', bookID)
      book.set('nowOwner', userID)
      book.set('borrowDate', new Date())
      book.set('status', 1)
      book.set('nowOwnerName', name)
      book.save()
        .then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  returnBook(userId, bookName, borrowDate, bookID) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var team = AV.Object.createWithoutData('Team', userId)
      team.addUnique('records', {
          bookID: bookID,
          bookName: bookName,
          borrowDate: borrowDate,
          returnDate: new Date()
        })
        .save()
        .then(() => {
          var book = AV.Object.createWithoutData('Books', bookID)
          book.set('nowOwner', '')
          book.set('borrowDate', new Date(0))
          book.set('status', 0)
          book.set('nowOwnerName', '')
          return book.save()
        })
        .then((res) => {
          UI.hideLoading()
          resolve(res)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  getRecords(userId) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Team')
      query.get(userId)
        .then((res) => {
          UI.hideLoading()
          resolve(res.attributes.records)
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  },

  getBorrowingBooks(userId) {
    return new Promise((resolve, reject) => {
      UI.showLoading()
      var query = new AV.Query('Books')
      query.equalTo('nowOwner', userId).find()
        .then((res) => {
          UI.hideLoading()
          resolve(this.bookResHandle(res))
        })
        .catch((err) => {
          UI.hideLoading()
          UI.error()
          reject(err)
        })
    })
  }
}


module.exports = api
