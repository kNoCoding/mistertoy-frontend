import { Link } from "react-router-dom"

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy, addToCart }) {

    // Convert labels array to a comma-separated string
    const labelsStr = Array.isArray(toy.labels) ? toy.labels.join(', ') : 'No labels';

    return (
        <li className="toy-preview" key={toy._id}>
            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
                <h1>⛐</h1>
            </Link>
            {/* <p>Price: <span>${toy.price.toLocaleString()}</span></p> */}
            <p>Name: <span>{toy.name}</span></p>
            <p>Price: <span>{toy.price}</span></p>
            {/* <p>Owner: <span>{toy.owner && toy.owner.fullname}</span></p> */}
            <p>Labels: <span>{labelsStr}</span></p>
            <p>Avaliable: <span>{toy.inStock ? 'YES!' : 'NO..'}</span></p>
            <div>
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <button onClick={() => {
                    onEditToy(toy)
                }}>Edit</button>
            </div>
            <button className="buy" onClick={() => {
                addToCart(toy)
            }}>Add to Cart</button>

        </li>
    )
}