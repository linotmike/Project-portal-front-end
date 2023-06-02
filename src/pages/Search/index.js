import React from "react";
import { useState, useEffect } from 'react';
import SearchForm from "../../components/SearchForm";

export default function Home() {
  return (
    <div className="container-fluid p-3">
      <SearchForm />
    </div>
  );
}
