import { NextResponse } from "next/server";

// Chiayi City, Taiwan
const LAT = 23.4801;
const LON = 120.4491;

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no api key" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${apiKey}&units=metric`,
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: res.status });
    }

    const d = await res.json();

    return NextResponse.json({
      temp: Math.round(d.main.temp),
      feelsLike: Math.round(d.main.feels_like),
      humidity: d.main.humidity,
      condition: d.weather[0].main,
      description: d.weather[0].description,
      windSpeed: Math.round(d.wind.speed * 3.6), // m/s → km/h
      windDeg: d.wind.deg,
      code: d.weather[0].id,
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}
