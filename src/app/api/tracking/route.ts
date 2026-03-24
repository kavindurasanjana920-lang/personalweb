export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const waybillId = searchParams.get('waybill_id');

    console.log("[TRACKING API] Request received:", { waybillId });

    if (!waybillId) {
      return Response.json(
        { success: false, error: "Waybill ID is required" },
        { status: 400 }
      );
    }

    const externalUrl = `https://api.consumer.oms.parallaxtec.dev/api/tracking?waybill_id=${waybillId}`;
    
    console.log("[TRACKING API] Proxying request to:", externalUrl);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(externalUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Portfolio-Tracking-Service/1.0",
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      console.log("[TRACKING API] External API response status:", response.status);

      // Read the response body first
      const responseText = await response.text();
      console.log("[TRACKING API] External API response body:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("[TRACKING API] Failed to parse JSON response");
        return Response.json(
          { success: false, error: "Invalid JSON response from external API" },
          { status: 502 }
        );
      }

      if (!response.ok) {
        console.error("[TRACKING API] External API error:", response.status, data);
        return Response.json(
          { success: false, error: `API returned ${response.status}`, details: data },
          { status: 200 } // Return 200 so client can handle the error properly
        );
      }

      console.log("[TRACKING API] Success:", data);

      return Response.json(data);
    } catch (fetchError) {
      clearTimeout(timeout);
      
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("[TRACKING API] Request timeout");
        return Response.json(
          { success: false, error: "Request timeout - external API not responding" },
          { status: 200 }
        );
      }
      
      console.error("[TRACKING API] Fetch error:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error("[TRACKING API] Proxy error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return Response.json(
      { 
        success: false, 
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 200 } // Return 200 so client receives the error message
    );
  }
}
