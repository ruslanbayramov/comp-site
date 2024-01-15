import { useState } from "react";

const products = [
  {
    name: "msi",
    inches: "15.6",
    model: "titan gt77",
    price: 2800,
    img: "msi-titan-gt77.png",
    selected: false,
  },
  {
    name: "asus",
    inches: "17.3",
    model: "rog zephyrus",
    price: 1900,
    img: "asus-rog-strix-scar.jpg",
    selected: false,
  },

  {
    name: "msi",
    inches: "17.3",
    model: "katana",
    price: 1500,
    img: "msi-katana.jpg",
    selected: false,
  },
  {
    name: "acer",
    inches: "15.6",
    model: "nitro 15",
    price: 1500,
    img: "acer-nitro-15.jpg",
    selected: false,
  },
  {
    name: "asus",
    inches: "13.1",
    model: "zenbook pro",
    price: 1200,
    img: "asus-zenbook-pro.jpg",
    selected: false,
  },
  {
    name: "msi",
    inches: "15.6",
    model: "thin gf63",
    price: 1600,
    img: "msi-thin-gf63.png",
    selected: false,
  },
  {
    name: "acer",
    inches: "17.6",
    model: "nitro 5",
    price: 1800,
    img: "acer-nitro-5.jpg",
    selected: false,
  },
  {
    name: "acer",
    inches: "13.1",
    model: "nitro 16",
    price: 2200,
    img: "acer-nitro-16.jpg",
    selected: false,
  },
  {
    name: "asus",
    inches: "15.6",
    model: "rog strix g15",
    price: 2500,
    img: "asus-rog-strix.jpg",
    selected: false,
  },
];

const links = ["msi", "asus", "acer"];

export default function App() {
  const [isSelected, setIsSelected] = useState(products.slice());
  // console.log(isSelected);

  function handleSelect(itm) {
    // console.log(itm);

    setIsSelected((items) =>
      items.map((item) =>
        item.name === itm ? { ...item, selected: !item.selected } : item
      )
    );
  }

  return (
    <main className="container">
      <Navbar onSelect={handleSelect} />
      <Items selected={isSelected} />
    </main>
  );
}

function Navbar({ onSelect }) {
  return (
    <section className="section-nav">
      <nav className="nav">
        <ul className="nav-list">
          {links.map((link) => (
            <Link link={link} key={link} onSelect={onSelect} />
          ))}
        </ul>
      </nav>
    </section>
  );
}

function Link({ link, onSelect }) {
  return (
    <li>
      <input type="checkbox" onClick={() => onSelect(link)} />
      <span>{link}</span>
    </li>
  );
}

function Items({ selected }) {
  // logic for select one or multiple items
  const arr = selected
    .map((product) => (product.selected ? true : false))
    .reduce((acc, el) => acc + el, 0);
  // console.log(arr);

  // sorted logic
  const [sortedBy, setSortedBy] = useState("uptodown");
  // console.log(sortedBy);

  // if there is no sorting, false used for default products
  const [isSorted, setIsSoted] = useState(false);

  // sorted items
  let sorted;
  if (sortedBy === "uptodown") {
    sorted = products.slice().sort((a, b) => b.price - a.price);
  }
  if (sortedBy === "downtoup") {
    sorted = products.slice().sort((a, b) => a.price - b.price);
  }
  if (arr > 0 && sortedBy === "uptodown") {
    sorted = selected.slice().sort((a, b) => b.price - a.price);
  }
  if (arr > 0 && sortedBy === "downtoup") {
    sorted = selected.slice().sort((a, b) => a.price - b.price);
  }

  return (
    <section className="section-item">
      <main className="main-item">
        <div className="sort-container">
          <span>Sort by</span>

          {sortedBy === "uptodown" && (
            <img
              src="./img/sort-uptodown.png"
              alt="sortup"
              className="sort-img"
              onClick={() => {
                setSortedBy((val) => "downtoup");
                setIsSoted((val) => true);
              }}
            />
          )}

          {sortedBy === "downtoup" && (
            <img
              src="./img/sort-downtoup.png"
              alt="sortup"
              className="sort-img"
              onClick={() => {
                setSortedBy((val) => "uptodown");
                setIsSoted((val) => true);
              }}
            />
          )}
        </div>

        {
          // default product without sorting
          arr === 0 &&
            !isSorted &&
            sortedBy === "uptodown" &&
            products.map((product) => (
              <Item item={product} key={product.model} isSelected={true} />
            ))
        }

        {
          // product with sorting but not original one manipulated, instead .slice copying
          arr === 0 &&
            isSorted &&
            sortedBy === "uptodown" &&
            sorted.map((product) => (
              <Item item={product} key={product.model} isSelected={true} />
            ))
        }

        {
          // product with sorting but not original one manipulated, instead .slice copying
          arr === 0 &&
            isSorted &&
            sortedBy === "downtoup" &&
            sorted.map((product) => (
              <Item item={product} key={product.model} isSelected={true} />
            ))
        }

        {
          // selected items with sorting
          arr > 0 &&
            isSorted &&
            sortedBy === "uptodown" &&
            sorted.map((product) => (
              <Item
                item={product}
                key={product.model}
                isSelected={product.selected}
              />
            ))
        }

        {
          // selected items with sorting
          arr > 0 &&
            isSorted &&
            sortedBy === "downtoup" &&
            sorted.map((product) => (
              <Item
                item={product}
                key={product.model}
                isSelected={product.selected}
              />
            ))
        }

        {
          // selected items without sorting
          arr > 0 &&
            !isSorted &&
            selected.map((product) => (
              <Item
                item={product}
                key={product.model}
                isSelected={product.selected}
              />
            ))
        }
      </main>
    </section>
  );
}

function Item({ item, isSelected }) {
  if (isSelected)
    return (
      <div className="item">
        <img src={`./img/${item.img}`} alt="item" className="item-img" />
        <div className="item-content">
          <h1 className="item-header">
            {item.name} {item.model} {item.inches} inches
          </h1>
          <p className="item-text">${item.price}</p>
        </div>
      </div>
    );
}
