var product = new productInfo();
var validation = new Validation();
var services = new Services();
function getEle(id){
   return document.getElementById(id);
}
function fetchData(){
    services
        .getListProduct()
        .then(function (result) {
            renderHTML(result.data)
        })
        .catch(function (error) {
            console.log(error);
        })
}
fetchData();
function renderHTML(data) {
    content = ``;
    data.forEach(function (products, index) {
        content += `
        <tr>
        <td>${index + 1}</td>
        <td>${products.taiKhoan}</td>
        <td>${products.hoTen}</td>
        <td>${products.matKhau}</td>
        <td>${products.email}</td>
        <td>${products.ngonNgu}</td>
        <td>${products.nguoiDung}</td>
        <td>${products.moTa}</td>
        <td>${products.hinhAnh}</td>
        <td>
              <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" onclick="editProduct(${products.id
            })">Edit</button>
              <button class="btn btn-danger" onclick="deleteProduct(${products.id
            })">Delete</button>
            </td>
        </tr>
        `;
    });
    getEle("danhsachND").innerHTML = content;
};
function deleteProduct(id) {
    services
        .deleteProduct(id)
        .then(function () {
            //render list data
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
        });
}

getEle("btnPlus").addEventListener("click", function () {
    //Sửa Title
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm người dùng";

    //Tạo nút "Add"
    var btnAdd = `<button class= "btn btn-success" onclick = "addingInfo()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

function addingInfo(){
    var taiKhoan = getEle("accounT").value;
    var hoTen = getEle("fullName").value;
    var matKhau = getEle("matKhau1").value;
    var email = getEle("Email").value;
    var nguoiDung = getEle("peopleType").value;
    var ngonNgu = getEle("languageType").value;
    var moTa = getEle("describeInfo").value;
    var hinhAnh = getEle("imageInfo").value;

    var isValid = true;
    //taiKhoan
    isValid &= validation.kiemTraRong(
        taiKhoan,
        "alertAccounts",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraTaiKhoanTonTai(
            taiKhoan,
            "alertAccounts",
            "Tài khoản đã tồn tại ! Vui lòng nhập tài khoản mới !"
        );
    //hoTen
    isValid &= validation.kiemTraRong(
        hoTen,
        "alertFullName",
        "Vui lòng không để trống!"
    ) && validation.kiemTraKiTuChuoi(
        hoTen,
        "alertFullName",
        "Vui lòng không nhập số và kí tự đặc biệt !"
    );
    //matKhau
    isValid &= validation.kiemTraRong(
        matKhau,
        "alertPassword",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraMatKhau(
            matKhau,
            "alertPassword",
            "Vui lòng nhập ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, một kí tự số "
        )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "alertPassword",
            "Vui lòng nhập 6-8 ký tự !",
            6,
            8
        );
    //email
    isValid &= validation.kiemTraRong(
        email,
        "alertEmail",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraEmail(
            email,
            "alertEmail",
            "Vui lòng nhập đúng kiểu định dạng email!Vd: email@gmail.com"
        );
    //ngonNgu
    isValid &= validation.kiemTraLoaiNguoiDung(
        "languageType",
        "alertLanguageType",
        "Vui lòng chọn ngôn ngữ !"
    )
    //nguoiDung
    isValid &= validation.kiemTraLoaiNguoiDung(
        "peopleType",
        "typePeopleAlert",
        "Vui lòng chọn loại người dùng !"
    )
    //moTa
    isValid &= validation.kiemTraRong(
        moTa,
        "describeAlert",
        "Vui lòng không để trống!"
    )
        && validation.kiemTraDoDaiKiTu(
            matKhau,
            "alertPassword",
            "Vui lòng nhập không quá 60 ký tự !",
            1,
            60
        );;
    //hinhAnh
    isValid &= validation.kiemTraRong(
        hinhAnh,
        "imageAlert",
        "Vui lòng không để trống!"
    );
    if (!isValid) return null;
    var product = new productInfo("",taiKhoan,hoTen,matKhau,email,nguoiDung,ngonNgu);

    services
        .addProduct(product)
        .then(function () {
            fetchData();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
}


