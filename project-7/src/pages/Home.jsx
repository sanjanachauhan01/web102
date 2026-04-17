import pokemonTeamImage from '../assets/pokemon-team-image.jpeg'

function Home() {
  return (
    <>
    <div className="header">
      <h1>Create your dream Pokémon Team!</h1>
      <p className="description">
        Have you always wished you could customize your dream team? Now you can! Add, edit, and delete Pokémon to your team with your desired stats. This version only has the first 100 pokémon in the pokédex. Get started by going to the side navigation panel and pressing "Add a Pokémon"!
      </p>
    </div>
    <img src={pokemonTeamImage} alt="Pokemon team" />
    </>
  )
}

export default Home
