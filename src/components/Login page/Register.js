import { useRef } from 'react';
import { useFormik } from 'formik';
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/todoSlice';
import auth from '../../api/auth';
const Register = ({toggle}) => {
  const dispatch=useDispatch()
  const ref = useRef(null)
const {values,handleChange,handleSubmit} = useFormik({
            initialValues: {
              name:'',
              email: '',
              password: '',
            },
            onSubmit:async(values)  => {
                 ref.current.continuousStart();
                 ref.current.complete()
                 try {
                  const output = await auth("register", values);
                  if (output.success) {
                    toast.success(output.message);
                    dispatch(setUser({
                      isloggedin:true
                    }))
                  } else {
                    toast.error(output.message);
                  }
                } catch (error) {
                  toast.error(error.message);
                }
            }
          });
  return (
      <div className=" w-100 h-75 d-flex justify-content-center align-items-center">
            <LoadingBar color='red' ref={ref} />
      <form className="w-50" onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example3">
            Name
          </label>
          <input type="text" id="form2Example3" className="form-control" placeholder="Enter your Name" required onChange={handleChange} name="name" value={values.name}/>
        </div>
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input type="email" id="form2Example1" className="form-control" placeholder="Enter your Email" required  onChange={handleChange} name="email" value={values.email}/>
        </div>
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">
            Password
       </label>
          <input type="password" id="form2Example2" className="form-control" placeholder="Enter your password" required onChange={handleChange} name="password" value={values.password}/>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Register
        </button>

        <div className="text-center">
          <p>
            Already a user ? <span onClick={toggle} className="text-primary text-decoration-underline pe-auto" role="button">Login</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register
