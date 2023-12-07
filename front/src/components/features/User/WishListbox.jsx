import React from "react";
import "../../styles/wish.css";
import { Button } from "@mui/material";

const WishListBox = () => {
  
  
  return (
    <div className="cel-table">
      {/* 첫 번째 행 */}
      <div className="category-header">번호</div>
      <div className="category-header">상품 사진</div>
      <div className="category-header">상품명</div>
      <div className="category-header">금액</div>
      <div className="category-header"></div>
      {/* 두 번째 행 */}
      {rowData.map((row) => (
        <React.Fragment key={row.id}>
          <div className="category-cell">{row.id}</div>
          <div className="category-cell">{/* 상품 사진 이미지  */}</div>
          <div className="category-cell">{row.productName}</div>
          <div className="category-cell">{row.price}</div>
          <div className="category-cell">
            {" "}
            <Button variant="text" onClick={() => deleteRow(row.id)}>
              삭제
            </Button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WishListBox;
