import { URL } from 'url'; // 导入URL模块

// 用户名规则：4-20位字母数字下划线
const USERNAME_REGEX = /^\w{4,20}$/; // 定义用户名正则表达式

// 密码规则：至少8位，包含大写字母和数字
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // 定义密码正则表达式

// 允许的协议白名单
const ALLOWED_PROTOCOLS = ['http:', 'https:']; // 定义允许的协议列表

export const validateRegistration = (username, password) => {
  const errors = []; // 初始化错误数组
  
  if (!USERNAME_REGEX.test(username)) {
    errors.push('用户名必须为4-20位字母、数字或下划线'); // 用户名不符合规则时添加错误信息
  }

  if (!PASSWORD_REGEX.test(password)) {
    errors.push('密码需至少8位且包含大写字母和数字'); // 密码不符合规则时添加错误信息
  }

  return { isValid: errors.length === 0, errors }; // 返回验证结果和错误信息
};

export const validateLogin = (username, password) => {
  const errors = []; // 初始化错误数组
  
  if (!username?.trim()) {
    errors.push('用户名不能为空'); // 用户名为空时添加错误信息
  }

  if (!password || password.length < 8) {
    errors.push('密码不能为空且至少8位'); // 密码为空或长度不足时添加错误信息
  }

  return { isValid: errors.length === 0, errors }; // 返回验证结果和错误信息
};

export const validateSubscriptionUrl = (url) => {
  try {
    const parsedUrl = new URL(url); // 解析URL
    
    if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
      return { isValid: false, error: '仅支持HTTP/HTTPS协议' }; // 协议不在白名单时返回错误信息
    }

    if (parsedUrl.username || parsedUrl.password) {
      return { isValid: false, error: 'URL不能包含认证信息' }; // URL包含认证信息时返回错误信息
    }

    return { isValid: true }; // URL有效时返回成功信息
  } catch (error) {
    return { isValid: false, error: '无效的URL格式' }; // URL格式无效时返回错误信息
  }
};