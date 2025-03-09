import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">SDT:0333 222 333</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
          Chịu trách nhiệm nội dung
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Điều khoản sử dụng
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Thông tin liên hệ
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
