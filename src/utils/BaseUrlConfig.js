let apiUrl;
let isProd = false;

//http://cloud.mathcrowd.cn:8081/messages?group_by=3&access-token=dev
if (isProd) {
  apiUrl = 'https://sygbackstage2.hongchentech.com/';//生产环境
} else {

  apiUrl = "http://cloud.mathcrowd.cn:8081";
}

export {apiUrl, isProd, }
