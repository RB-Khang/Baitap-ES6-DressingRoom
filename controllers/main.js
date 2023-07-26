//global variables
const getId = (id) => document.getElementById(id)
const getElement = (selector) => document.querySelector(selector)
const thayDo = function (type, imgSrc) {
  getElement(`.${type}`).style.background = `url(${imgSrc}) 0% 0% / 100%`
}

const getJson = function () {
  let dataJson = fetch('../data/Data.json')
  dataJson.then(res => {
    return res.json()
  }).then(data => {
    const { navPills, tabPanes } = data
    // console.log(navPills);
    // console.log(tabPanes);
    let tab = ''
    let tabContent = ''
    navPills.map((tabLabel, key) => {
      const { tabName, showName, type } = tabLabel
      if (key == 0) {
        tab += `
                <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="${type}"
                data-bs-toggle="tab"
                href="#${type}-tabs"
                role="tab"
                aria-controls="${type}-tabs"
                aria-selected="true"
                >${showName}</a
              >
            </li>
            `
        tabContent += `
            <div
            class="tab-pane fade show active"
            id="${type}-tabs"
            role="tabpanel"
            aria-labelledby="${type}-tabs"
            >          
            `
      }
      else {
        tab += `
                <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="${type}"
                data-bs-toggle="tab"
                href="#${type}-tabs"
                role="tab"
                aria-controls="${type}-tabs"
                aria-selected="true"
                >${showName}</a
              >
            </li>
            `
        tabContent += `
            <div
            class="tab-pane fade  "
            id="${type}-tabs"
            role="tabpanel"
            aria-labelledby="${type}-tabs"
            >
            `
      }
      tabPanes.map((res) => {
        const { id, type, name, desc, imgSrc_jpg, imgSrc_png } = res;
        if (tabLabel.type === type) {
          tabContent += `<div class="product-item">
                                  <img class="product-img" src="${imgSrc_jpg}" alt="" />
                                  <p> ${name}</p>
                                  <button class="btn btn-outline-dark" onclick="thayDo('${type}','${imgSrc_png}' )">Thử đồ</button>
                          </div> `
        }
      })
      tabContent += `</div>`
    }
    )
    getId('tabPills').innerHTML = tab
    getId('tabContent').innerHTML = tabContent
    // console.log(tabContent);

  }).catch(err => console.log(err))
}

getJson()