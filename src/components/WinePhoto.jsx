import Heading from "../ui/Heading";

import {
  styledWinePhoto,
  DivWine,
} from "../styles/styledComponents/styledWine";

function WinePhoto({ productMatches }) {
  if (!productMatches) return null;
  const length = productMatches?.length;

  if (length < 1) return null;
  const title = productMatches[0]?.title;
  const image = productMatches[0]?.imageUrl;
  const url = "url(" + image + ")";

  return (
    <div style={styledWinePhoto}>
      <Heading
        style={{
          fontSize: "1.5rem",
        }}
      >
        <p
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {title}
        </p>
      </Heading>
      <DivWine
        style={{
          backgroundImage: url,
        }}
      ></DivWine>
    </div>
  );
}

export default WinePhoto;
