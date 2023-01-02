"""Formats openapi schema and improves legibility of path operation names.

For example, imagine a `/api/items` path operation.
Then `operationId` gets modified like this:
    `api_items_read_items_get` ---> `read_items_get`
"""

import json
from pathlib import Path
import re

file_path = Path("./openapi.json")
openapi_content: dict[str, dict[str, dict]] = json.loads(file_path.read_text())

for path_name, path_data in openapi_content["paths"].items():
    path_name = path_name.removeprefix("/").replace("/", "_")
    for operation in path_data.values():
        new_operation_id: str = operation["operationId"]
        new_operation_id = re.sub(rf"^{path_name}_?", "", new_operation_id)
        operation["operationId"] = new_operation_id

file_path.write_text(json.dumps(openapi_content))
