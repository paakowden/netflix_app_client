import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./listItem.scss";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzNjYwNTNmYzA5Y2NjMDFjNGU1OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE5MDc2MywiZXhwIjoxNjMxNjIyNzYzfQ.ZJbajy9NsQwiDAzYil1Ark0Y4Cm6s95LS-eqoHAryrs",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  //  "https://biteable.com/content/uploads/2019/02/video-marketing-statistics-cover-blog-thumb-720x560-c-default.jpg";

  //"https://www.marca.com/en/football/international-football/2021/09/06/6136788e268e3e1c6b8b4571.html";
  // "https://support.microsoft.com/en-us/office/video-add-links-in-a-file-9232f21b-0dd2-4b4c-bbed-4a27492b9fb2";
  //"https://video.link/w/t6b8c";

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie.img}
          //"https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg"
          //"https://biteable.com/content/uploads/2019/02/video-marketing-statistics-cover-blog-thumb-720x560-c-default.jpg"

          alt=""
        />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
