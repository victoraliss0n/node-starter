import * as Yup from 'yup'

export const validateCreate = body => {
  console.info(body.provider_id)
  const schema = Yup.object().shape({
    provider_id: Yup.number().required(),
    date: Yup.date().required(),
  })
  return schema.isValid(body)
}
