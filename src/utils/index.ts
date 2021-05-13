/**
 * created by zbf at 2019-12-13 10:24:20
 *
 * 设置foucs位置/选中元素
 *
 * @param tarDom 目标元素
 * @param startPos 选中开始位置
 * @param endPos 结束位置
 */

export const setPosition = (tarDom: any, startPos = 0, endPos = startPos): void => {
  if (tarDom.setSelectionRange) {
    // setTimeout必须写，不然setSelectionRange无效
    // https://stackoverflow.com/questions/11723420/chrome-setselectionrange-not-work-in-oninput-handler
    setTimeout(() => {
      tarDom.setSelectionRange(startPos, endPos);
      tarDom.focus();
    }, 0);
  } else {
    console.log('无法重置贯标位置');
  }
};

/**
 * created by zbf at 2019-12-13 09:56:23
 *
 * 从focus位置插入元素
 *
 * @param dom 需要插入的input或textarea元素
 * @param tarValue 插入的目标值
 * @param direct 是否直接插入到元素中
 * @returns 插入后的值
 */
export const insert = (dom, tarValue, direct = false) => {
  // 返回值
  let res = '';
  if (dom.selectionStart || dom.selectionStart === 0) {
    const startPos = dom.selectionStart;
    const endPos = dom.selectionEnd || 0;

    // 前半部分值
    const prefixVal = dom.value.substring(0, startPos);
    // 后半部分值
    const suffixVal = dom.value.substring(endPos, dom.value.length);
    res = prefixVal + tarValue + suffixVal;

    // 设置光标位置
    setPosition(dom, startPos + tarValue.length);
  } else {
    res += tarValue;
  }

  if (direct) {
    dom.value = res;
  }

  return res;
};

/**
 * 页面默认no-ani类，调用该方法以修改class展示动画
 * 请在单页内容每次执行该方法
 */
export const loadAnimate = (): void => {
  const timer = 0;
  const cardList = document.getElementsByClassName('no-ani');
  Array.prototype.slice
    .apply(cardList)
    .forEach((item: HTMLBaseElement, index: number) => {
      setTimeout(() => {
        item.classList.remove('no-ani');
        item.classList.add('fadeIn');
      }, timer + index * 20);
    });
};

/**
 * 判断访问的客户端类型
 * @returns boolean
 */
export const IsPC = (): boolean => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

/**
 * 访问记录，可根据需要收集更详细的访问信息
 *
 * @param to 前往页面地址
 * @param content 内容说明
 */
export const visiteLog = (to: string, content: string) => {
  const imgDom = document.createElement('img');
  imgDom.setAttribute(
    'src',
    `/api/visited?url=${to}&content=${content}&t=${new Date().getTime()}&client=${
      IsPC() ? 'PC' : 'MB'
    }`
  );

  imgDom.style.display = 'none';

  document.body.appendChild(imgDom);
  setTimeout(() => {
    document.body.removeChild(imgDom);
  }, 100);
};
