import { Badge } from 'react-bootstrap';
import { FaCheckCircle, FaSyncAlt, FaEye, FaDownload, FaQuestionCircle } from 'react-icons/fa';

const getStatusInfo = (status) => {
    switch (status) {
        case 1:
            return { text: "Hoàn thành", variant: "success", icon: <FaCheckCircle /> };
        case 2:
            return { text: "Đang xử lý", variant: "primary", icon: <FaSyncAlt /> };
        case 3:
            return { text: "Hiển thị dữ liệu", variant: "warning", icon: <FaEye /> };
        case 4:
            return { text: "Đã tải file", variant: "info", icon: <FaDownload /> };
        default:
            return { text: "Không xác định", variant: "secondary", icon: <FaQuestionCircle /> };
    }
};

const StatusBadge = ({ status }) => {
    const { text, variant, icon } = getStatusInfo(status);

    return (
        <Badge pill bg={variant} className="d-flex align-items-center gap-2 p-2">
            {icon} {text}
        </Badge>
    );
};

export default StatusBadge;
