import { useSnackbar } from 'notistack';

const errorMessages = {
  0: 'Lỗi không xác định',
  1: 'Email không hợp lệ',
  2: 'Email đã tồn tại',
  3: 'Mật khẩu không hợp lệ',
  4: 'Tên không hợp lệ',
  5: 'Giới tính không hợp lệ',
  6: 'Vai trò không hợp lệ',
  7: 'MSSV không hợp lệ',
  8: 'MSSV đã tồn tại',
  9: 'Mật khẩu cũ không khớp',
  10: 'Email không tồn tại',
  11: 'Lớp học phần hoặc Mã phòng thi không tồn tại',
  12: 'Bạn đã gửi đơn hoãn thi này rồi, vui lòng đợi phòng khảo thí duyệt',
  13: 'Đã vượt quá số lần gửi phúc khảo cho môn này',
  14: 'Bạn đã gửi đơn phúc khảo này rồi, vui lòng đợi phòng khảo thí duyệt',
};

export const useHandleErrors = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (errors) => {
    errors.forEach((error, index) => {
      const vietnameseError = errorMessages[error.code] || error.code;
      setTimeout(() => {
        enqueueSnackbar(vietnameseError, { variant: 'error' });
      }, index * 200); // Hiển thị SnackBar cách nhau 0.2 giây
    });
  };
};
