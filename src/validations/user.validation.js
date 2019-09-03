import * as Yup from 'yup'
export const validateUpdate = body => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  })
  return schema.isValid(body)
}
