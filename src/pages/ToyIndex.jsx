// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART, SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const cart = useSelector(storeState => storeState.toyModule.shoppingCart)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        // Define an async function inside the useEffect
        async function fetchToys() {
            try {
                await loadToys(filterBy)
            } catch (error) {
                showErrorMsg('Cannot show toys')
            }
        }

        // Call the async function
        fetchToys()
    }, [filterBy])

    // useEffect(() => {
    //     loadToys(filterBy)
    //         .catch(() => {
    //             showErrorMsg('Cannot show toys')
    //         })
    // }, [filterBy])

    function onRemoveToy(toyId) {
        // removeToyOptimistic(toyId)
        removeToy(toyId)
        try {
            console.log('im where i want to be!');
            showSuccessMsg(`Toy ID:${toyId} removed`)
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }
    // function onRemoveToy(toyId) {
    //     // removeToyOptimistic(toyId)
    //     removeToy(toyId)
    //         .then(() => {
    //             showSuccessMsg('Toy removed')
    //         })
    //         .catch(err => {
    //             console.log('Cannot remove toy', err)
    //             showErrorMsg('Cannot remove toy')
    //         })
    // }

    async function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        var savedToy = await saveToy(toyToSave)
        try {
            console.log('savedToy:', savedToy)
            showSuccessMsg(`Toy added (name: ${savedToy.name})`)
            // dispatch({ type: ADD_TOY, toy: savedToy })
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }
    }

    // function onAddToy() {
    //     const toyToSave = toyService.getEmptyToy()
    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             console.log('savedToy:', savedToy)
    //             showSuccessMsg(`Toy added (name: ${savedToy.name})`)
    //             // dispatch({ type: ADD_TOY, toy: savedToy })
    //         })
    //         .catch(err => {
    //             console.log('Cannot add toy', err)
    //             showErrorMsg('Cannot add toy')
    //         })
    // }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        var savedToy = await saveToy(toyToSave)
        try {
            // dispatch({ type: UPDATE_TOY, toy: savedToy })
            showSuccessMsg(`Toy(${savedToy.name}) updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')
        }
    }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             // dispatch({ type: UPDATE_TOY, toy: savedToy })
    //             showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    //         })

    //         .catch(err => {
    //             console.log('Cannot update toy', err)
    //             showErrorMsg('Cannot update toy')
    //         })
    // }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function addToCart(toy) {
        console.log('toy:', toy)
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <div>
            <h1>Toys App</h1>
            <main>
                <button onClick={onAddToy}>Add Toy ⛐</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onEditToy={onEditToy}
                    onRemoveToy={onRemoveToy}
                    addToCart={addToCart}
                    txt={'999'}
                    nums={[1, 2, 3]}
                />}
                {isLoading && <div>Loading...</div>}
                <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </main>
        </div>
    )
}