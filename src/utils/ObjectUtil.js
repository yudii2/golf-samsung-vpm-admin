import { isEqual } from "lodash";
import {
  pick as _pick,
  values as _values,
  every as _every,
  isNil as _isNil,
  isEqual as _isEqual,
} from "lodash";

export function isUndefinedOrNull(value) {
  return value === undefined || value === null;
}

export function deepEquals(value, other) {
  return isEqual(value, other);
}

export function deepDiffs(value, other) {
  const changes = {};

  const originKeys = Object.getOwnPropertyNames(value);
  const otherKeys = Object.getOwnPropertyNames(other);

  for (const key of [...originKeys, ...otherKeys]) {
    if (key === "__ob__") {
      continue;
    }

    if (value[key] && typeof value[key] === "object") {
      if (!Array.isArray(value[key])) {
        const diffs = deepDiffs(value[key] || {}, other[key] || {});
        if (diffs) {
          changes[key] = diffs;
        }
        continue;
      }
    }

    if (!deepEquals(value[key], other[key])) {
      changes[key] = other[key];
    }
  }

  if (0 < Object.getOwnPropertyNames(changes).length) {
    return changes;
  }
}

export function deepDiffsRecords(value, other, idFields = ["id"]) {
  // 파라미터 체크
  if (
    !Array.isArray(value) ||
    !Array.isArray(other) ||
    !Array.isArray(idFields)
  ) {
    throw new Error("All parameters must be array");
  }

  if (idFields.length === 0) {
    throw new Error("idFields has at least one id field name");
  }

  // id가 없으면 : addedRecords
  const addedRecords = other.filter((record) => {
    return _every(_values(_pick(record, idFields)), (idFieldValue) =>
      _isNil(idFieldValue)
    );
  });

  // id 기준으로 value에는 있는데, other에는 없으면 : deletedRecords
  const deletedRecords = value.filter((record) => {
    const valueIdFieldValues = _pick(record, idFields);
    return (
      other.find((otherRecord) => {
        return _isEqual(valueIdFieldValues, _pick(otherRecord, idFields));
      }) === undefined
    );
  });

  let changedRecords = [];

  // id 기준으로 둘 다 있는것 중에 바뀐것 : changedRecords
  value.forEach((valueRecord) => {
    const valueIdFieldValues = _pick(valueRecord, idFields);
    const otherIdRecord = other.find((otherRecord) => {
      return _isEqual(valueIdFieldValues, _pick(otherRecord, idFields));
    });
    if (otherIdRecord !== undefined) {
      const diffRecord = deepDiffs(valueRecord, otherIdRecord);
      if (diffRecord) {
        //
        changedRecords.push({
          ...valueIdFieldValues, // update를 위해서는 key 필요함
          ...diffRecord,
        });
      }
    }
  });

  return {
    addedRecords: addedRecords.length > 0 ? addedRecords : undefined,
    changedRecords: changedRecords.length > 0 ? changedRecords : undefined,
    deletedRecords: deletedRecords.length > 0 ? deletedRecords : undefined,
  };
}

export function compactObjectValues(
  object,
  isTrimWhitespaces = false,
  allowEmptyString = false
) {
  if (object === undefined || object === null) {
    return undefined;
  }

  if (typeof object === "string") {
    const str = isTrimWhitespaces ? object.trim() : object;
    if (!allowEmptyString && str === "") {
      return undefined;
    } else {
      return str;
    }
  }

  if (Array.isArray(object)) {
    return object.reduce((prev, el) => {
      const compacted = compactObjectValues(
        el,
        isTrimWhitespaces,
        allowEmptyString
      );
      if (compacted !== undefined) {
        prev.push(compacted);
      }

      return prev;
    }, []);
  }

  if (typeof object === "object") {
    return Object.getOwnPropertyNames(object).reduce((prev, key) => {
      if (
        key !== "__ob__" &&
        Object.prototype.hasOwnProperty.call(object, key)
      ) {
        const compacted = compactObjectValues(
          object[key],
          isTrimWhitespaces,
          allowEmptyString
        );
        if (compacted !== undefined) {
          if (!prev) {
            const returnObject = {};
            returnObject[key] = compacted;

            return returnObject;
          } else {
            prev[key] = compacted;
          }
        }
      }

      return prev;
    }, undefined);
  }

  return object;
}
