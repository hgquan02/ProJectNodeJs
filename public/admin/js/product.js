//Change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "unactive" : "active";
 
      // console.log(statusCurrent);
      // console.log(id);
      // console.log(statusChange);

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      
      formChangeStatus.submit();
    });
  });
}

//End Change-status

//Delete Item
const buttonDeletes = document.querySelectorAll("[button-delete]")
if(buttonDeletes.length > 0){
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonDeletes.forEach(button => {
    button.addEventListener("click", () => {
      
      const isConferm = confirm("Ban co chac muon xoa khong");
      if(isConferm){
        const id = button.getAttribute("data-id");
        
        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//End delete item
