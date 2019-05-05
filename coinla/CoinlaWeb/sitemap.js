const { Minimatch } = require('minimatch')
const filesystem = require('fs')
const sm = require('sitemap')
const config = require('./nuxt.config')

// 从 nuxtjs 的 pages 文件夹获取所有的路由
const getAllFilesFromFolder = function (dir) {
  let results = []
  filesystem.readdirSync(dir).forEach(function (file) {
    // 对所有的动态路由不生成 （稍后将针对动态路由专门生成）
    if (file.match(/^_/)) return
    file = dir + '/' + file
    const stat = filesystem.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesFromFolder(file))
    } else results.push(file)
  })

  results.forEach(function (file, index, array) {
    array[index] = file
      .replace('./pages', '') // 去掉路径中的 ./pages
      .replace('.vue', '') // 去掉路径中的后缀
      .replace('index', '') // 去掉路径中 index 去掉
  })
  return results
}

// 读取静态路由部分
let urls = getAllFilesFromFolder('./pages')
console.log(urls)

// // 读取 user id
// let uids = filesystem.readFileSync('./.sitemap/uid.txt', 'utf8')
// uids = uids.split('\r\n')
// let uidArray = uids.map(uid => `/coin/${uid}`)
// urls = urls.concat(uidArray)
// console.log(urls)
