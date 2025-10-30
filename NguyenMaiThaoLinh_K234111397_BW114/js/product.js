// Tạo XMLHttpRequest để đọc file XML
var xhr = new XMLHttpRequest();
xhr.open("GET", "/xml/Products.xml", true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var xmlDoc = xhr.responseXML;
        var products = xmlDoc.getElementsByTagName("product");
        var tbody = document.getElementById("product_tbody");
        
        // Tạo hàng cho mỗi sản phẩm
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            
            // Lấy thông tin sản phẩm
            const id = product.getElementsByTagName("id")[0].childNodes[0].nodeValue;
            const name = product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            const detail = product.getElementsByTagName("detail")[0].childNodes[0].nodeValue;
            const image = product.getElementsByTagName("image")[0].childNodes[0].nodeValue;
            
            // Tạo các ô dữ liệu
            const tdId = document.createElement("td");
            tdId.innerText = id;
            
            const tdName = document.createElement("td");
            tdName.innerText = name;
            
            const tdDetail = document.createElement("td");
            tdDetail.className = "product-detail";
            tdDetail.innerText = detail;
            
            const tdImage = document.createElement("td");
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = name;
            imgElement.className = "product-image";
            tdImage.appendChild(imgElement);
            
            const tdActions = document.createElement("td");
            
            // Nút xem chi tiết
            const detailBtn = document.createElement("img");
            detailBtn.src = "/images/detail.png";
            detailBtn.alt = "Xem chi tiết";
            detailBtn.className = "action-icon";
            detailBtn.title = "Xem chi tiết";
            detailBtn.style.cursor = "pointer";
            detailBtn.style.width = "24px";
            detailBtn.style.height = "24px";
            
            // Nút xóa
            const deleteBtn = document.createElement("img");
            deleteBtn.src = "/images/remove.png";
            deleteBtn.alt = "Xóa";
            deleteBtn.className = "action-icon";
            deleteBtn.title = "Xóa";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.width = "24px";
            deleteBtn.style.height = "24px";
            
            tdActions.appendChild(detailBtn);
            tdActions.appendChild(deleteBtn);
            
            // Tạo hàng và thêm các ô vào
            const tr = document.createElement("tr");
            tr.appendChild(tdId);
            tr.appendChild(tdName);
            tr.appendChild(tdDetail);
            tr.appendChild(tdImage);
            tr.appendChild(tdActions);
            
            // Thêm hàng vào bảng
            tbody.appendChild(tr);
            
            // Xử lý sự kiện cho nút xem chi tiết - FIXED
            detailBtn.onclick = (function(productId, productName, productDetail, productImage) {
                return function() {
                    const productData = {
                        "id": productId,
                        "name": productName,
                        "detail": productDetail,
                        "image": productImage
                    };
                    const stringJson = JSON.stringify(productData);
                    localStorage.setItem("selected_product", stringJson);
                    window.open("Product_detail.html", "_self");
                };
            })(id, name, detail, image);
            
            // Xử lý sự kiện cho nút xóa - FIXED
            deleteBtn.onclick = (function(productRow, productName) {
                return function() {
                    if (confirm("Bạn có chắc muốn xóa sản phẩm '" + productName + "' không?")) {
                        tbody.removeChild(productRow);
                    }
                };
            })(tr, name);
        }
    }
};