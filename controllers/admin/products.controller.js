const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

//[get] /admin/products


// Truy vấn data trong database
//Tính năng lọc theo trạng thái
module.exports.index = async (req, res) => {
// Tách riêng hàm lọc sang 1 file mới (filterStatus.js)
  const filterStatus = filterStatusHelper(req.query);
  

  //Lọc ra sản phẩm trạng thái chưa bị xóa
  let find = {
    deleted: false,

  };

  //req.query : Trả ra câu truy vấn trên url
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);


  // Tính năng tìm kiếm
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  //Phân trang Pagination
  const countProducts = await Product.countDocuments(find);// Truy vấn database
  //Gọi hàm 
  let objectPagination = paginationHelper(
    {
    currentPage: 1,
    limitItem: 4
    },
    req.query,
    countProducts
  ) ;

 
  //End Phân trang Pagination

  const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);// Truy vấn 
    
  // console.log(products);

  //Truyền ra view
  res.render("admin/pages/products/index",{
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword ,
    pagination: objectPagination
  });
};


//[patch] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash('info', 'Cập nhật trạng thái sản phẩm thành công');

  res.redirect("back");
};

//[patch] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  console.log(req.body);
  res.send("ok");
};

//[delete] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id },{
    deleted: true, 
    deletedAt: new Date()
  });

  res.redirect("back");
};


//[get] /admin/products/create
module.exports.create = async (req, res) => {
    //Truyền ra view
  res.render("admin/pages/products/create",{
    pageTitle: "Thêm mới sản phẩm",
    
  });
};
//[get] /admin/products/create
module.exports.createPost = async (req, res) => {
  // Lấy ra data - req.body
  
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if(req.body.position == ""){
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }else{
    req.body.position = parseInt(req.body.position);
  }

  // Tạo mới 1 sản phẩm
  const product = new Product(req.body);
  //Lưu vào db
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

//[get] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  //Truyền ra view
res.render("admin/pages/products/edit",{
  pageTitle: "Chỉnh sửa sản phẩm",
  
});
};

//[get] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find ={
      deleted: false ,
      _id: req.params.id 
    };

    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });

    
  } catch (error) {
    
  }
};
