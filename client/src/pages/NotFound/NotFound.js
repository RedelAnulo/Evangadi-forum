import React from "react";

function NotFound() {
	return (
		<div className="pt-10 h-96 bg-slate-100">
			<h1 className="pb-8 text-3xl text-center">oops!!!</h1>
			<h1 className="text-4xl text-center">
				{" "}
				No page found with the current route
			</h1>
		</div>
	);
}

export default NotFound;
