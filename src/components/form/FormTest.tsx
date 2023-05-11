import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
const FormTset: FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name1: 'ok',
      name2: 'ok'
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data)
  }
  useEffect(() => {
    setValue('name1', 'name1')
    setValue('name2', 'name2')
  }, [setValue])
  return (
    <div>
      <form className="form-control w-25" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="/">name1</label>
        <input
          className="form-control"
          type="text"
          placeholder="ok"
          {...register('name1', {
            required: true,
            minLength: 2
          })}
        />
        {errors.name1?.type == 'required' && <p>required</p>}
        {errors.name1?.type == 'minLength' && <p>minLength</p>}
        <label htmlFor="/">name2</label>
        <input
          className="form-control"
          type="text"
          placeholder="ok"
          {...register('name2', {
            required: true,
            minLength: 2
          })}
        />
        {errors.name2?.type == 'required' && <p>required</p>}
        {errors.name2?.type == 'minLength' && <p>minLength</p>}
        <button type="submit" className="btn btn-success">
          submit
        </button>
      </form>
    </div>
  )
}
export default FormTset
