import React, { useEffect, useState } from 'react'
import FormInput from '../../form-input/form-input.component.jsx';
import CustomButton from '../../custom-button/custom-button.component.jsx';
import styled from 'styled-components'

const Multiselect = styled.div`

    margin-bottom: 3rem;

    .brands-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        &.wish {
            p.brand {
                
                :hover {
                    background-color: #96afff;
                }

                &.selected {
                    background-color: #485cad;
                    color: #fff;   
                }
            }
        }
        
        &.have {
            p.brand {
                
                :hover {
                    background-color: #7fffac;
                }

                &.selected {
                    background-color: #2aad58;
                    color: #fff;   
                }
            }
        }

    }

    p.brand {
        margin: .5rem;
        padding: .5rem .6rem;
        background-color: #fff;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
        
    }

`

const Btncontrols = styled.div`

    display: flex;
    justify-content: space-between;
    .btn-amdin {
        height: 50px;
        margin: 0;
    }

`

export default function Preference({setuser, prevStep, nextStep}) {
    const countries_list = ["FRA", "DEU", "GBR", "ITA", "ESP", "BEL"]
    const country_labels_list = ["FRANCE", "GERMANY", "UNITED KINGDOM", "ITALY", "SPAIN", "BELGIUM"]
    const categories = ['AIR JORDAN', 'ASICS', 'JORDAN', 'CONVERSE', 'NEW BALANCE', 'NIKE', 'REEBOK', 'UNDER ARMOUR',
              'VANS', 'ADIDAS']
    const defaultState = {age: '', bought: [], prefered: [], country: '', gender: '', info: {type: '', msg: ''}}
    const [prefs, setprefs] = useState(defaultState)

    const handleChange = ev=> {
        setprefs({...prefs, [ev.target.name]: ev.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        const { age, country, gender, prefered, bought } = prefs

        const newPrefs = {
            age, country, gender, 
            whatAlreadyHas: bought,
            chosenCategories: prefered
        }
        setuser(newPrefs)
        nextStep()
    }

    const updateFavorite =  index=> ev=>{
        
        let lst = prefs.prefered
        lst[index] = lst[index] === 0 ? 1 : 0
        setprefs({...prefs, prefered: [...lst]})
    }

    const updateBought = index=> ev=>{
        
        let lst = prefs.bought
        lst[index] = lst[index] === 0 ? 1 : 0
        setprefs({...prefs, bought: [...lst]})
    }


    useEffect(() => {
        let initial_boughts_prefs = []
        for (let index = 0; index < 10; index++) {
            initial_boughts_prefs.push(0)
        }
        setprefs({...prefs, bought: [...initial_boughts_prefs], prefered: [...initial_boughts_prefs]})
    }, [])

    useEffect(() => {
        console.log(prefs)
    }, [prefs])

    return (
        <div className="sign-up">
            <p>Help us to suggest you <span className="txt-secondary fw-500">the most relevant shoes</span>.</p>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="number"
                    name="age"
                    value={prefs.age}
                    onChange={handleChange}
                    label="Age"
                    required
                />
                <div className="group">
                    <label htmlFor="gender" className="shrink form-input-label">Gender</label>
                    <select className="gender-select form-input" onChange={handleChange} name="gender" id="gender" value={prefs.gender}>
                        <option value="">Please select your gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="country" className="shrink form-input-label">Country</label>
                    <select className="country-select form-input" onChange={handleChange} name="country" id="country" value={prefs.country}>
                        <option value="">Please select your country</option>
                        {
                            country_labels_list.map((country, i)=>(
                                <option key={i} value={countries_list[i]}>{country}</option>
                            ))
                        }
                    </select>
                </div>

                <Multiselect>
                    <label htmlFor="prefered">Select your favorite brands</label>
                    <div className="brands-list wish">
                        {
                            categories.map((c,i)=><p className={`brand ${prefs.prefered[i] === 0 ? '':'selected'}`} key={i} onClick={updateFavorite(i)}>{c}</p>)
                        }
                    </div>
                </Multiselect>
                <Multiselect>
                    <label htmlFor="bought">Which one have you already got ?</label>
                    <div className="brands-list have">
                        {
                            categories.map((c,i)=><p className={`brand ${prefs.bought[i] === 0 ? '':'selected'}`} key={i} onClick={updateBought(i)}>{c}</p>)
                        }
                    </div>
                </Multiselect>
                
                <div >
                    <p className={prefs.info.type ? prefs.info.type === 'success' ? 'success' : 'danger' : '' }> {prefs.info.msg} </p>
                </div>
                <Btncontrols>
                    <CustomButton type='cancel' disabled={prefs.loading} className="btn btn-admin txt-dark" onClick={ev=>{prevStep()}}>Back</CustomButton>
                    <CustomButton type='submit' disabled={prefs.loading} >Create Account</CustomButton>
                </Btncontrols>
                
            </form>
        </div>
    )
}
