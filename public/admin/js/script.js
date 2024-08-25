//button stattus // bộ lọc 

const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0 ){
  let url = new URL(window.location.href);


  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      
      if (status) {
        url.searchParams.set("status", status);
      }else{
        url.searchParams.delete("status");
      }

      console.log(url.href);
      window.location.href = url.href;
    })
  })
}

//Form Search 
//Lấy ra form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);//Láy ra url
  //Người dùng ấn tìm kiếm chạy vào sự kiện submit
  formSearch.addEventListener("submit",(e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value ;//Lấy giá trị của nó
    console.log(e.target.elements.keyword.value);
    if (keyword) {
      url.searchParams.set("keyword", keyword);// Set keyword trên url
    }else{
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
} 

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;

    });
  });
}
//End pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputId.forEach(input => {
        input.checked = true ;
      });
    }else{
      inputId.forEach(input => {
        input.checked = false ;
      });
    }
  });

  inputId.forEach(input => {
    input.addEventListener("click", () =>{
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      
      console.log(inputId.length);
      if(countChecked == inputId.length){
        inputCheckAll.checked = true ;
      }else{
        inputCheckAll.checked = false ;
      }
    });
  });

}

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    if(inputsChecked.length>0){
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input => {
        const id = input.value;
        ids.push(id);
      });

      
      inputIds.value = ids.join(", ");
      formChangeMulti.submit();
    }else{
      alert("Vui long chon it nhat 1 ban ghi");
    }
  });

  
}
// End Form Change Multi

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  console.log(showAlert);
}
//end show-alert
