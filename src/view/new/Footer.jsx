import React from './node_modules/react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-left">
        <strong>5</strong>
        <span>item left</span>
      </div>
      <ul className="footer-middle">
        <li>
          <a href="#">Active</a>
        </li>

        <li>
          <a href="#">Active</a>
        </li>
        <li>
          <a href="#">Completed</a>
        </li>
      </ul>
      <button className="footer-right">Clear completed 1</button>
    </footer>
  )
}
