import html2canvas from 'html2canvas';

export function ExportImg(element, filename, ext) {
  html2canvas(element, {
    useCORS: true,
  }).then((canvas) => {
    if (navigator.msSaveBlob) {
      const blob = canvas.msToBlob(); // IE10+
      return navigator.msSaveBlob(blob, name);
    } else {
      const imageurl = canvas.toDataURL('image/png');
      const aLink = document.createElement('a'); // 创建a标签
      aLink.style.display = 'none';
      aLink.href = imageurl;
      aLink.download = `${filename}.${ext}`; // 下载文件名
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); // 用完后移除元素
    }
  });
}

/**
 * @desc
 * @param { File } 文件file
 * @return { Boolean } 是图片 true 不是 false
 */
export function isImage(file) {
  // 检查文件MIME类型
  return file.type.startsWith('image/');
}

// 将视频时长(秒)转化为时分秒的形式
export function getVideoTime(seconds) {
  let secondTime = parseInt(seconds) // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 时
  if(secondTime > 60) {
    // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取余，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if(minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取余的分，获取分钟除以60取余的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  // 若秒数是个位数，前面用0补齐
  secondTime = secondTime < 10 ? `0${secondTime}` : secondTime
  let result = secondTime
  if(minuteTime > 0) {
    // 若分钟数是个位数，前面用0补齐
    minuteTime = minuteTime < 10 ? `0${minuteTime}` : minuteTime 
    result = `${minuteTime}:${result}`
  }else {
    // 若分钟数为0，用"00"表示
    result = `00:${result}`
  }

  if(hourTime > 0) {
    // 若小时数是个位数，前面用0补齐
    hourTime = hourTime < 10 ? `0${hourTime}` : hourTime
    result = `${hourTime}:${result}`
  }else {
    // 若小时数为0，用"00"表示
    result = `00:${result}`
  }
  return result
}
