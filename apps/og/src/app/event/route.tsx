import { ImageResponse } from "next/server";
import Color from "colorjs.io";

import Logo from "./Logo";

export const config = {
  runtime: "experimental-edge",
};

const parameterRequired = (name: string) =>
  new Response(`${name} is a required parameter.`, {
    status: 400,
  });

const inter = fetch(new URL("./Inter-Regular.otf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const interBold = fetch(new URL("./Inter-Bold.otf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);
export const GET = async (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  const title = searchParams.get("title");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const room = searchParams.get("room");
  const image = searchParams.get("image");
  const imageColor = searchParams.get("imageColor");
  const token = searchParams.get("token");

  if (!title) return parameterRequired("title");
  if (!start) return parameterRequired("start");
  if (!end) return parameterRequired("end");
  if (!room) return parameterRequired("room");
  if (!image) return parameterRequired("image");
  if (!imageColor) return parameterRequired("imageColor");

  const formatDate = new Intl.DateTimeFormat("en", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formatTime = new Intl.DateTimeFormat("en", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
  });

  const startDate = new Date(start);
  const endDate = new Date(end);

  const imageColorTransparent = new Color(imageColor);
  imageColorTransparent.alpha = 0.25;
  const imageColorTransparentString = imageColorTransparent.toString({
    format: "rgba",
  });

  const interData = await inter;
  const interBoldData = await interBold;
  return new ImageResponse(
    (
      <div
        style={{
          background: "#161615",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 50,
        }}
      >
        <div
          style={{
            fontSize: 128,
            flexShrink: 1,
            padding: 50,
            display: "flex",
            flexDirection: "column",
            fontFamily: '"Inter"',
          }}
        >
          <Logo
            style={{
              width: 64,
              height: 64,
            }}
          />
          <h1
            style={{
              color: "#EDEDEC",
              fontWeight: 600,
              fontSize: 64,
              lineHeight: "110%",
              margin: "36px 0 0 0",
              // @ts-expect-error `textWrap` is a valid property.
              // https://github.com/vercel/satori#:~:text=wrap%2C-,balance,-%2C%20defaults%20to%20wrap
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          <ul
            style={{
              display: "flex",
              gap: 4,
              flexDirection: "column",
              justifyContent: "flex-end",
              flexGrow: 1,
              color: "#A1A09A",
              fontWeight: 400,
              fontSize: 24,
            }}
          >
            <li>{formatDate.format(startDate)}</li>
            <li>
              {formatTime.format(startDate)} ⟶ {formatTime.format(endDate)}
            </li>
            <li>{room}</li>
          </ul>
        </div>
        <img
          src={image}
          style={{
            alignSelf: "center",
            width: 430,
            height: 560,
            margin: 20,
            borderRadius: 16,
            objectFit: "cover",
            boxShadow: `0px 0px 150px 75px ${imageColorTransparentString}`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: interData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBoldData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
};
