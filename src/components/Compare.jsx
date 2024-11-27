import { useEffect, useState } from "react";
import Select from "react-select";
import { Databases } from "appwrite";
import client, { DATABASE_ID, COLLECTION_ID } from "../lib/appwrite";

const Compare = () => {
  const [treks, setTreks] = useState([]);
  const [selectedTreks, setSelectedTreks] = useState([null, null, null, null]);
  const [trekDetails, setTrekDetails] = useState([null, null, null, null]);

  // Fetch trek data from Appwrite
  useEffect(() => {
    const databases = new Databases(client);

    databases
      .listDocuments(DATABASE_ID, COLLECTION_ID)
      .then((response) => {
        const trekData = response.documents.map((doc) => ({
          id: doc.$id,
          name: doc["trek-name"],
          location: doc.location,
          price: doc.price,
          grade: doc.grade,
          start: doc.start,
          end: doc.end,
          inclusion: doc.inclusion,
          exclusion: doc.exclusion,
          duration: doc.Duration,
          distance: doc.Distance,
          altitude: doc.Altitude,
          url: doc.url,
        }));
        setTreks(trekData);
      })
      .catch((error) => console.error("Error fetching trek data:", error));
  }, []);

  // Handle trek selection
  const handleSelect = (index, selectedOption) => {
    const updatedSelection = [...selectedTreks];
    const updatedDetails = [...trekDetails];

    if (selectedOption) {
      const selectedTrek = treks.find(
        (trek) => trek.id === selectedOption.value,
      );
      updatedSelection[index] = selectedOption;
      updatedDetails[index] = selectedTrek;
    } else {
      updatedSelection[index] = null;
      updatedDetails[index] = null;
    }

    setSelectedTreks(updatedSelection);
    setTrekDetails(updatedDetails);
  };

  // Get SVG for difficulty level
  const getDifficultySVG = (grade) => {
    switch (grade) {
      case "Easy":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height="50"
            viewBox="0 0 67 50"
            fill="none"
          >
            <g clipPath="url(#clip0_148_375)">
              <rect width="66.6667" height="50" fill="white"></rect>
              <path
                d="M13.1405 31.768L35.8883 39.1392C38.146 40.4053 38.9459 43.2799 37.6799 45.5374C36.4139 47.795 33.5393 48.595 31.2817 47.329L13.1396 31.7666L13.1405 31.768Z"
                fill="#00393C"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
                fill="#A3F3A5"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
                fill="#D4EAE2"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
                fill="#D4EAE2"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
                fill="#D4EAE2"
              ></path>
              <path
                d="M36.6484 14.9092V26.9092H33.7539V17.6162H33.6836L31 19.2568V16.749L33.959 14.9092H36.6484Z"
                fill="#00393C"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_148_375">
                <rect width="66.6667" height="50" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        );
      case "Moderate":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height="50"
            viewBox="0 0 67 50"
            fill="none"
          >
            <rect width="66.6667" height="50" fill="white"></rect>
            <path
              d="M21.167 19.5424L39.0625 39.8941C40.5292 42.4347 39.6443 45.6985 37.1038 47.1651C34.5633 48.6317 31.2994 47.7469 29.8328 45.2064L21.167 19.5405V19.5424Z"
              fill="#00393C"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
              fill="#F9F871"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
              fill="#F9F871"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
              fill="#D4EAE2"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
              fill="#D4EAE2"
            ></path>
            <path
              d="M29.1734 26.7305V24.6727L33.4913 20.8923C33.815 20.5994 34.0906 20.3316 34.3179 20.0889C34.5453 19.8422 34.7187 19.5956 34.8382 19.349C34.9576 19.0985 35.0173 18.8268 35.0173 18.5339C35.0173 18.2064 34.9461 17.927 34.8035 17.6958C34.6609 17.4607 34.4644 17.2796 34.2139 17.1524C33.9634 17.0253 33.6763 16.9617 33.3526 16.9617C33.025 16.9617 32.738 17.0291 32.4913 17.164C32.2447 17.295 32.052 17.4858 31.9133 17.7362C31.7784 17.9867 31.711 18.2912 31.711 18.6495H29C29 17.8441 29.1811 17.1486 29.5434 16.5628C29.9056 15.9771 30.4143 15.5262 31.0694 15.2102C31.7283 14.8904 32.4933 14.7305 33.3642 14.7305C34.262 14.7305 35.0424 14.8808 35.7052 15.1813C36.368 15.4819 36.8805 15.902 37.2428 16.4415C37.6089 16.9771 37.7919 17.5994 37.7919 18.3085C37.7919 18.7594 37.7013 19.2064 37.5202 19.6495C37.3391 20.0927 37.0135 20.5821 36.5434 21.1178C36.0771 21.6534 35.4143 22.295 34.5549 23.0426L33.1387 24.349V24.4241H37.9364V26.7305H29.1734Z"
              fill="#00393C"
            ></path>
          </svg>
        );
      case "Difficult":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="67"
            height="50"
            viewBox="0 0 67 50"
            fill="none"
          >
            <rect width="66.6667" height="50" fill="white"></rect>
            <path
              d="M45.5 19.5424L27.6045 39.8941C26.1378 42.4347 27.0227 45.6985 29.5632 47.1651C32.1037 48.6317 35.3676 47.7469 36.8342 45.2064L45.5 19.5405V19.5424Z"
              fill="#00393C"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M55.4387 27.3841C55.6976 28.749 55.8337 30.1605 55.8337 31.6076C55.8337 36.5086 54.2715 41.0324 51.6172 44.7245L58.3835 49.5889C62.0228 44.5267 64.167 38.3114 64.167 31.6076C64.167 29.6367 63.9815 27.7054 63.626 25.8311L55.4387 27.3841Z"
              fill="#D4EAE2"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.744 9.15103C42.6108 9.63615 49.3958 14.169 53.0254 20.7122C53.7039 21.9353 54.2712 23.2276 54.7142 24.5754L62.6309 21.9733C62.0221 20.1212 61.243 18.3472 60.3126 16.6699C55.3521 7.72741 46.0635 1.49991 35.2569 0.833496L34.744 9.15103Z"
              fill="#F87D3A"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.2283 27.3841C10.9694 28.749 10.8333 30.1605 10.8333 31.6076C10.8333 36.5086 12.3955 41.0324 15.0498 44.7245L8.28354 49.5889C4.64422 44.5267 2.5 38.3114 2.5 31.6076C2.5 29.6367 2.68545 27.7054 3.04099 25.8311L11.2283 27.3841Z"
              fill="#F87D3A"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.923 9.15103C24.0562 9.63615 17.2712 14.169 13.6416 20.7122C12.9631 21.9353 12.3958 23.2276 11.9528 24.5754L4.03613 21.9733C4.64489 20.1212 5.42395 18.3472 6.35438 16.6699C11.3149 7.72741 20.6034 1.49991 31.4101 0.833496L31.923 9.15103Z"
              fill="#F87D3A"
            ></path>
            <path
              d="M33.5913 26.7305C32.7015 26.7305 31.9125 26.5784 31.2243 26.2742C30.5399 25.9662 30 25.5423 29.6046 25.0023C29.2091 24.4624 29.0076 23.8407 29 23.1373H31.8403C31.8517 23.3921 31.9335 23.6183 32.0856 23.816C32.2376 24.0099 32.4449 24.162 32.7072 24.2723C32.9696 24.3826 33.2681 24.4377 33.6027 24.4377C33.9373 24.4377 34.2319 24.3788 34.4867 24.2609C34.7452 24.1392 34.9468 23.9738 35.0913 23.7647C35.2357 23.5518 35.3061 23.3084 35.3023 23.0347C35.3061 22.7609 35.2281 22.5175 35.0684 22.3046C34.9087 22.0917 34.6825 21.9263 34.3897 21.8084C34.1008 21.6905 33.7586 21.6316 33.3631 21.6316H32.2281V19.624H33.3631C33.7091 19.624 34.0133 19.567 34.2757 19.4529C34.5418 19.3388 34.749 19.1791 34.8973 18.9738C35.0456 18.7647 35.1179 18.5251 35.1141 18.2552C35.1179 17.9928 35.0551 17.7628 34.9259 17.5651C34.8004 17.3635 34.6236 17.2077 34.3954 17.0974C34.1711 16.9871 33.9106 16.932 33.6141 16.932C33.3023 16.932 33.019 16.9871 32.7643 17.0974C32.5133 17.2077 32.3137 17.3635 32.1654 17.5651C32.0171 17.7666 31.9392 18.0004 31.9316 18.2666H29.2338C29.2414 17.5708 29.4354 16.9586 29.8156 16.4301C30.1958 15.8978 30.7129 15.4814 31.3669 15.181C32.0247 14.8807 32.7738 14.7305 33.6141 14.7305C34.4506 14.7305 35.1863 14.8769 35.8213 15.1696C36.4563 15.4624 36.9506 15.8616 37.3042 16.3674C37.6578 16.8693 37.8346 17.4377 37.8346 18.0727C37.8384 18.7305 37.6236 19.2723 37.1901 19.6981C36.7605 20.124 36.2072 20.3864 35.5304 20.4852V20.5765C36.4354 20.6829 37.1179 20.9757 37.5779 21.4548C38.0418 21.9339 38.2719 22.5327 38.2681 23.2514C38.2681 23.9282 38.0684 24.5289 37.6692 25.0537C37.2738 25.5746 36.7224 25.9852 36.0152 26.2856C35.3118 26.5822 34.5038 26.7305 33.5913 26.7305Z"
              fill="#00393C"
            ></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <section className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-[linear-gradient(to_right,rgba(5,29,73,0.9),rgba(35,60,88,0.6)),url('./assets/asset3.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-[0.37]"></div>
        <div className="relative flex flex-col gap-5 text-center">
          <h1 className="text-7xl font-semibold text-white">
            Trekking Community
          </h1>
          <p className="text-xl font-semibold text-white">
            Don&apos;t Take Trip, Choose Experience
          </p>
        </div>
      </section>
      <section className="bg-gray-100 p-8 py-32">
        <div className="mt-20 px-20">
          <div className="rounded-3xl border-2 border-gray-300 bg-white p-10 shadow-lg">
            <div className="grid grid-cols-4 gap-6">
              {selectedTreks.map((trek, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center rounded-lg border bg-gray-50 p-6 text-center shadow-md"
                >
                  <div className="flex h-auto items-center justify-center">
                    {trek ? (
                      <div></div>
                    ) : (
                      <div>
                        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-gray-400">
                          <span className="text-gray-400">+</span>
                        </div>
                        <p className="text-sm text-gray-400">Add trek</p>
                      </div>
                    )}
                  </div>
                  <Select
                    options={treks.map((trek) => ({
                      value: trek.id,
                      label: `${trek.name}`,
                    }))}
                    onChange={(selectedOption) =>
                      handleSelect(index, selectedOption)
                    }
                    placeholder="Select Trek"
                    isClearable
                  />
                </div>
              ))}
            </div>
            {trekDetails.some((detail) => detail) && (
              <div className="mt-12 overflow-x-auto">
                <h2 className="mb-6 text-center text-2xl font-bold text-[#324B4C]">
                  Comparison Result
                </h2>
                <table className="w-full table-auto border-collapse rounded-2xl border border-gray-200 text-left shadow-md">
                  <thead>
                    <tr className="bg-gray-200 text-[#2b4142]">
                      <th className="border border-gray-300 px-6 py-4">
                        Field
                      </th>
                      {trekDetails.map(
                        (trek, index) =>
                          trek && (
                            <th
                              key={index}
                              className="border border-gray-300 px-6 py-4 text-center"
                            >
                              {trek.name}
                            </th>
                          ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Name", key: "name" },
                      { label: "Price", key: "price", unit: "₹" },
                      {
                        label: "Details/Book",
                        key: "url",
                        formatter: (url) =>
                          url ? (
                            <div
                              style={{
                                textAlign: "center",
                                margin: "auto",
                                backgroundColor: "#324B4C",
                                padding: "10px",
                                borderRadius: "0.5rem",
                                maxWidth: "10rem",
                              }}
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                  textDecoration: "none",
                                }}
                              >
                                Details/Book
                              </a>
                            </div>
                          ) : (
                            "N/A"
                          ),
                      },

                      { label: "Duration", key: "duration" },
                      { label: "Distance", key: "distance" },
                      { label: "Altitude", key: "altitude" },
                      {
                        label: "Start & End Point",
                        key: "startEnd",
                        formatter: (val, trek) => `${trek.start} - ${trek.end}`,
                      },
                      {
                        label: "Grade & Difficulty",
                        key: "grade",
                        formatter: (grade) =>
                          grade && (
                            <div className="flex items-center justify-center gap-2">
                              {getDifficultySVG(grade)}
                              <span>{grade}</span>
                            </div>
                          ),
                      },
                      {
                        label: "Inclusions",
                        key: "inclusion",
                        formatter: (val) =>
                          val && (
                            <ul className="ml-4 list-disc text-left">
                              {val.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          ),
                      },
                      {
                        label: "Exclusions",
                        key: "exclusion",
                        formatter: (val) =>
                          val && (
                            <ul className="ml-4 list-disc text-left">
                              {val.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          ),
                      },
                    ].map((field) => (
                      <tr
                        key={field.key}
                        className="text-[#324B4C] odd:bg-white even:bg-gray-50"
                      >
                        <td className="border border-gray-300 px-6 py-4 font-medium">
                          {field.label}
                        </td>
                        {trekDetails.map((trek, index) => (
                          <td
                            key={index}
                            className="border border-gray-300 px-6 py-4 text-center"
                          >
                            {trek && field.formatter
                              ? field.formatter(trek[field.key], trek)
                              : trek &&
                                `${field.unit || ""} ${trek[field.key]}`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Compare;
