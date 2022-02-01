import Grid from "@material-ui/core/Grid";
import styled from "@emotion/styled";

const BWrapper = styled.div`
  padding: 20px;
  max-width: 500px;
`;
const Contents = styled.div`
  font-family: verdana;
  font-size: 16px;
  color: #015e63;
  line-height: 1.5;
`;
const BorderImage = styled.figure`
  width: 250px;
  height: 131px;
  position: relative;
  background-size: cover;
  background-position: 50%;
  margin: 0px;
  background-image: url("${(props) => props.src}");
  &::before {
    content: "";
    position: absolute;
    margin: 8px;
    width: 93% !important;
    height: 83% !important;
    border: 1px solid lightgrey;
  }
`;
const Head = styled.span`
  font-variant: small-caps;
  font-size: 20px;
  color: black;
`;
function Block() {
  return (
    <>
      <BWrapper>
        <BorderImage src={process.env.PUBLIC_URL + `/${name}.png`} />

        <p>
          <Head>The olfactory epithelium </Head> of a mouse is curled up like
          scrolls inside his nose. Smell is high-dimensional, has no notion of
          distance — how far is the smell of sweet from the smell of vapor? For
          each arbitrary shape, an arbitrary sensation; the Moon has a smell,
          though it has never been part of your evolutionary past.
        </p>
        <p>
          Researchers once argued about the cortex that stood right above the
          mouse’s nose; some said it was for smell, some said it was for fear.
          The argument ended after they realized that, to a mouse, they are one
          and the same: their entire world is encoded in smell.
        </p>
      </BWrapper>
      <BWrapper>
        <img src="./image 4.png" width="180px" />
        <p>
          The cortex is a sheet 5 microns thick. Along the perpendicular axis,
          neurons receive input from the same part of the brain and respond to
          the same property. Neuroscientists envision the cortex as a packing of{" "}
          <Head>cortical columns</Head>.
        </p>
        <p>
          Make no mistake, the term "cortical column" is more symbolic than
          concrete. You will not find cylinders of neurons with sharp boundaries
          where the receptive field changes.
        </p>
      </BWrapper>
      <BWrapper>
        <img src="./image 5.png" width="250px" />
        <p>
          <Head>Oscillations </Head> are fundamental to the working of the
          brain. Like the clock cycle of a computer, oscillation is used to
          synchronize operations. Information travels in ripples: someone says
          your name — beat 1. The sound wave is digitized — beat 2. It spreads
          to all of the first neuron’s neighbors — beat 3. It spreads to all of
          those neuron’s neighbors — beat 4. Where is oscillation located? In
          individual neurons, in networks of neurons, in coupled inputs and
          outputs? Do you need an environment to oscillate?
        </p>
        <p>
          Researchers in the 50s removed the spine of a cat and found, to their
          astonishment, that the disembodied spine still spiked with rhythmic
          repetition. We're able to generate rhythmic output in the absence of
          rhythmic input.
        </p>
      </BWrapper>
      <BWrapper>
        <img src="./image 6.png" width="220px" />
        <p>
          <Head>The cochlea</Head> is a neat example of energy transduction.
          Sensors everywhere on the body are tasked with translating energy
          waves into the common language of neural spikes.
        </p>
        <p>
          Sound is just a pressure wave, continuous in time. FFT is used to
          decompose a continuous signal into power at different frequencies —
          the cochlea performs a physical FFT. Some parts of the cochlear
          membrane are thicker than others, making them more responsive to lower
          frequencies.
        </p>
      </BWrapper>
    </>
  );
}
const name = "image 3";
function Home() {
  return (
    <Grid
      container
      className="Neuro"
      style={{ padding: "5%", paddingTop: "10vh" }}
    >
      <Grid item sm={2} xs={12}></Grid>
      <Grid item sm={2} xs={12}>
        <Contents>
          <div>cortical columns</div>
          <div>olfactory</div>
          <div>topography</div>
          <div>cochlea</div>
        </Contents>
      </Grid>
      <Grid item sm={5} xs={12}>
        {/* <img src="./little-plant.png" width="100px" /> */}
        I drew some of my favorite things in neuroscience.
        <Block />
        {/* <BorderImage src={process.env.PUBLIC_URL + `/image 5.png`} /> */}
      </Grid>
    </Grid>
  );
}

export default Home;
