import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '../componets'
import { useForm, useController } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { searchedPackages } from '../../features/tour.slice'
import axios from 'axios'
import config from '../../config/config'

const SearchForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { control, handleSubmit } = useForm()

    const { field: locationField } = useController({ name: 'location', control })
    const { field: depDateField } = useController({ name: 'dep_date', control })
    const { field: returnDateField } = useController({ name: 'return_date', control })

    const searchPackage = async (data) => {
        localStorage.removeItem('searchPackages')  // This Will remove the prevoius search Packages

        const response = await axios.post(`${config.server_url}/search/result`, data)

        if (response && response.status == 200) {
            dispatch(searchedPackages(response.data))
            navigate('/search/packages')
        }
    }

    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active">
                    <Link to="#" aria-controls="packages" role="tab" data-toggle="tab">
                        Search Package
                    </Link>
                </li>
            </ul>

            <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="packages">
                    <form onSubmit={handleSubmit(searchPackage)}>
                        <div className="row">
                            <div className="col-12  mt">
                                <div className="input-field">
                                    <label htmlFor="from">Destination:</label>
                                    <Input
                                        type={'text'}
                                        id={'from-place'}
                                        classs={'form-control'}
                                        placeholder={'Tokyo, Japan'}
                                        onChange={locationField.onChange}
                                        name={locationField.name}
                                    />
                                </div>
                            </div>
                            <div className="col-12  mt alternate">
                                <div className="input-field">
                                    <label htmlFor="date-start">Departs:</label>
                                    <Input
                                        type={'date'}
                                        id={'date-start'}
                                        classs={'form-control'}
                                        placeholder={'mm/dd/yyyy'}
                                        onChange={depDateField.onChange}
                                        name={depDateField.name}
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt alternate">
                                <div className="input-field">
                                    <label htmlFor="date-end">Return:</label>
                                    <Input
                                        type={'date'}
                                        id={'date-end'}
                                        classs={'form-control'}
                                        placeholder={'mm/dd/yyyy'}
                                        onChange={returnDateField.onChange}
                                        name={returnDateField.name}
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <Button
                                    type={'submit'}
                                    classes={'btn-block'}
                                    text={'Search Packages'}

                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchForm
