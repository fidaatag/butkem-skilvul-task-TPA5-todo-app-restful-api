# Bootcamp Skilvul FullStack TPA5 - Todo App

Hasil dari tugas ini adalah API sederhana yang bisa melakukan CRUD, authentication, authorization. Ketentuan tugas berdasarkan pada dokumentasi [ini](https://github.com/impactbyte/full-stack-web-assignments/tree/master/TPA005-backend)

## Dokumentasi API

[Silahkan lihat dokumentasi API di sini](https://documenter.getpostman.com/view/24897069/2s9YsMArRy)


## Catatan Penting

- Ketika deploy menggunakan railway, method POST tidak bisa berjalan. Sehingga ketika melakukan login / register / create, maka secara otomatis ke direct method GET. Lucunya, ketika melakukan GET / DELETE bisa, padahal sama-sama menggunakan token.
- Deploy menggunakan cyclic berjalan lancar. 
- Sering kali ketika melakukan proses tranfer data, koneksi antara compass dan atlas tidak sinkron, untuk itu harus melakukan reconnecting agar data bisa terdeteksi di local dan cloud.
- Respon API perlu di selaraskan, contohnya ketika GET detail dan GET all dimana terdapat object data sebagai penampung data-data yang diminta. Tujuannya agar memudahkan front-end untuk melakukan fetching.
- Jangan lupa untuk menjaga kerahasian password. Caranya dengan menghilangkan password (undefined) setelah mendapatkan token dan sebelum mengirimkan respon.
- Data yang dikirimkan ke mongodb secara otomatis akan memiliki data waktu (createdAT dan updatedAT). Untuk mengaktifkannya, tambahkan perintah `timestamps: true`. Namun, perlu diingat secara default zona waktu yang digunakan adalah UTC, artinya jika menggunakan WIB maka perbedaannya adalah 7 jam lebih awal dari UTC.

## Source yang berguna
- [MongoDB Dates](https://gist.github.com/guycalledseven)
- [CRUD rest-api with mongoose](https://www.bezkoder.com/node-express-mongodb-crud-rest-api/)
- [Deprecation warnings mongoose](https://mongoosejs.com/docs/5.x/docs/deprecations.html)

## Author

- Skilvul Profile - [@fidaatag](https://skilvul.com/profile/fidaatag)
- Twitter - [@fidaatag](https://twitter.com/fidaatag)
- Linkedin - [Fidaa Mustaghfiroh](https://www.linkedin.com/in/fidaatag/)

