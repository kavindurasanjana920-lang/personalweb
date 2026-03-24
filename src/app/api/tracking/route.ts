export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const waybillId = searchParams.get("waybill_id")?.trim().toUpperCase();

		if (!waybillId) {
			return Response.json(
				{ success: false, error: "Waybill ID is required" },
				{ status: 400 }
			);
		}

		const externalUrl = `https://api.consumer.oms.parallaxtec.dev/api/tracking?waybill_id=${encodeURIComponent(waybillId)}`;

		const response = await fetch(externalUrl, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			cache: "no-store",
		});

		const responseText = await response.text();

		let data: unknown;
		try {
			data = JSON.parse(responseText);
		} catch {
			return Response.json(
				{ success: false, error: "Invalid response from upstream API" },
				{ status: 502 }
			);
		}

		if (!response.ok) {
			return Response.json(
				{ success: false, error: `Upstream API error (${response.status})`, details: data },
				{ status: response.status }
			);
		}

		return Response.json(data, { status: 200 });
	} catch (error) {
		return Response.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Internal server error",
			},
			{ status: 500 }
		);
	}
}
