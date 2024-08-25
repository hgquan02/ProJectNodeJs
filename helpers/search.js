module.exports = (query) => {
  let objectSearch = {
    keyword: "",
  }

  
  if(query.keyword) {
    objectSearch.keyword = query.keyword; 

    const regex = new RegExp(objectSearch.keyword,"i");
    objectSearch.regex = regex;
  }

  return objectSearch;
}
// Chức năng tìm kiếm theo keyword trong danh sách sp admin
  